import React, { useState } from "react";
import { Flex, Button, Image } from "@chakra-ui/react";
import axios from 'axios'

const ShowQr = ({username}) => {
  const [qrCodeImageSrc, setQRCodeImageSrc] = useState('');

  const handleDownloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeImageSrc;
    link.download = 'profile_qr_code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShowQRCode = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/qr-code',{
        params: {
          username: username
        }
      });
      console.log(response.data);

      const base64Image = `data:image/png;base64,${btoa(
        new Uint8Array(response.data.qrCodeImage.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
      )}`;
      setQRCodeImageSrc(base64Image);
    } catch (error) {
      console.error('Error fetching or displaying QR code image:', error);
    }
  }

  return (
    <Flex alignItems="center" justifyContent="center" flexDirection="column">
      <Button onClick={handleShowQRCode}>Display QR</Button>
      {qrCodeImageSrc && <Image src={qrCodeImageSrc} alt="QR Code" />}
      {qrCodeImageSrc && <Button onClick={handleDownloadQRCode}>Download QR Code</Button>}
    </Flex>
  );
};

export default ShowQr;

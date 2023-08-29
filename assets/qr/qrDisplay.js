function generateQRDisplay(id,URL) {
    var qrcode = new QRCode("QR-"+id, {
        text: URL,
        width: 80,
        height: 80,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}
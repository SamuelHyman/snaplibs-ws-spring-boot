package com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.UUID;

import org.junit.Test;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

public class QRCodeTest {

  @Test
  public void testQRCode() throws IOException, WriterException {
    UUID uuid = UUID.randomUUID();

    System.out.println(uuid);

    QRCodeWriter qrCodeWriter = new QRCodeWriter();
    BitMatrix bitMatrix = qrCodeWriter.encode(uuid.toString(), BarcodeFormat.QR_CODE, 12, 12);

    Path path = FileSystems.getDefault().getPath("./temppng");
    MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
  }
}

package com.shfb.rfid.manage.util;
import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

/**
 * 图片水印
 */
public class WaterMarkUtil {
    public static void main(String[] args) {
        String srcImgPath = "I:\\test.jpg";
        String iconPath = "I:\\logo.jpg";
        String targerPath = "I:\\test2.jpg";
        WaterMarkUtil.waterMarkImageByIcon(iconPath, srcImgPath, targerPath, 0.5f);
    }

    public static void waterMarkImageByIcon(String iconPath, String srcImgPath, String targerPath, float clarity) {
        OutputStream os = null;
        try {
            Image srcImg = ImageIO.read(new File(srcImgPath));
            BufferedImage buffImg = new BufferedImage(srcImg.getWidth(null), srcImg.getHeight(null), BufferedImage.TYPE_INT_RGB);
            Graphics2D g = buffImg.createGraphics();
            g.setRenderingHint(RenderingHints.KEY_INTERPOLATION,
                    RenderingHints.VALUE_INTERPOLATION_BILINEAR);
            g.drawImage(srcImg.getScaledInstance(srcImg.getWidth(null), srcImg.getHeight(null), Image.SCALE_SMOOTH),
                    0, 0, null);
            ImageIcon imgIcon = new ImageIcon(iconPath);

            Image img = imgIcon.getImage();
            float alpha = clarity;
            g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP,
                    alpha));
            int srcImgWidth = srcImg.getWidth(null);
            int srcImgHeight = srcImg.getHeight(null);
            int iconWidth = imgIcon.getIconWidth();
            int iconHeight = imgIcon.getIconHeight();
            int width = srcImgWidth - iconWidth;
            int height = srcImgHeight - iconHeight;
            g.drawImage(img, width, height, null);
            g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER));
            g.dispose();
            os = new FileOutputStream(targerPath);
            ImageIO.write(buffImg, "JPG", os);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (null != os)
                    os.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
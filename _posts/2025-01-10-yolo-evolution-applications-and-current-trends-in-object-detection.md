---
date: 2025-01-10T13:39:00
author: Richard
tags:
  - AI
  - Computer Vision
  - yolo
  - Machine Learning
title: "YOLO Object Detection Explained: Every Version From v1 to YOLO11, Licensing and Uses"
image: /assets/images/ultralytics_yolo.png
video: ''
layout: post
image_alt: "Cover image for YOLO Object Detection Explained: Every Version From v1 to YOLO11, Licensing and Uses"
category: "Computer Vision"
---
Before YOLO, most object detectors worked in two stages. First they proposed a few thousand regions of the image that might contain something, then they ran a classifier on each one. This was accurate but slow. In 2015, Joseph Redmon and his co-authors at the University of Washington published [You Only Look Once](https://arxiv.org/abs/1506.02640), which did the whole job in a single pass. The network splits the image into a grid, and every cell predicts boxes and class probabilities at the same time, so the model only looks at the image once. It was fast enough to run on live video, which is the main reason it became popular.

Ten years later, "YOLO" refers to a whole family of models made by several different groups. This post covers how it developed, who made each version, how the licences differ, and what people use it for.

## From YOLOv1 to YOLO11

- **YOLOv1 (2015):** the single pass grid detector. Fast, but weak on small objects and objects close together.
- **YOLOv2 / YOLO9000 (2016):** batch normalisation, anchor boxes and training at several image sizes. The YOLO9000 variant could detect over 9,000 categories.
- **YOLOv3 (2018):** a deeper backbone (Darknet-53) and predictions at three scales, which helped a lot with small objects.
- **YOLOv4 (2020):** from Alexey Bochkovskiy, Chien-Yao Wang and Hong-Yuan Mark Liao after Redmon left. It collected many training tricks into one model, including Mosaic augmentation, which stitches four training images into one.
- **YOLOv5 (2020):** from Ultralytics, written in PyTorch rather than the original Darknet framework. It had no paper, and its name caused arguments at the time, but it became the version most people actually used because it was easy to install and train.
- **YOLOv6 (2022)** from Meituan and **YOLOv7 (2022)** from the YOLOv4 team pushed the speed and accuracy trade off further.
- **YOLOv8 (2023):** Ultralytics again, one package for detection, segmentation, classification and pose estimation.
- **YOLOv9 (2024):** from Wang and Liao, introducing Programmable Gradient Information (PGI), a way of keeping useful information from getting lost as it passes through a deep network.
- **YOLOv10 (2024):** from Tsinghua University, which removed the need for non-maximum suppression (NMS), the clean-up step that deletes duplicate boxes. Skipping it makes deployment simpler and faster.
- **YOLO11 (2024):** the latest Ultralytics release at the time of writing, with new building blocks for better accuracy at the same speed.

Redmon himself stopped working on computer vision in 2020. He said he was uncomfortable with how the work was being used, particularly for military applications and privacy-invading surveillance. All the versions after v3 were made by other researchers and companies.

## The Ultralytics connection

![Screenshot of the Ultralytics YOLO page](/assets/images/ultralytics_yolo.png "Screenshot of the Ultralytics YOLO page")

Ultralytics, led by Glenn Jocher, is now the name most people associate with YOLO. Their `ultralytics` pip package wraps several YOLO versions behind one Python API and command line tool. Training a detector on your own data is a few lines of code, and exporting to ONNX, OpenVINO, CoreML and other formats is a single command. This ease of use is a big part of why YOLO is so widely used.

## Licensing

This is easy to overlook. The original Darknet versions (v1 to v3) were released under a very permissive licence. The Ultralytics versions are under AGPL-3.0. In practice, if you use them in a product, including one that runs as a web service, you have to release your own source code under the same licence, or buy an Ultralytics enterprise licence. This is not a problem for research and personal projects, but a company should check it before building a product on top of it. Some of the non-Ultralytics versions, such as YOLOv9 and YOLOv10, have their own licences, so check each one.

The shift from academic project to commercial product has caused some friction in the open source community, mostly around naming and licensing. Still, Ultralytics is also the main reason YOLO is so easy to use today.

## What people use it for

YOLO fits anywhere you need to find and count things in images or video quickly, often on cheap hardware:

- Manufacturing: spotting defects on assembly lines and checking products as they pass a camera.
- Agriculture: counting fruit, spotting pests and identifying diseased leaves from field or drone images.
- Security and traffic: detecting people and vehicles, reading licence plates and recognising traffic signs.
- Medical imaging: research on finding lesions or tumours in scans and identifying pills.
- Robotics and driving: giving robots and vehicles a fast first pass at what is around them.

## Where it is heading

Recent versions focus more on making models easier and faster to deploy than on accuracy alone. Removing NMS, making models small enough for phones and edge devices, and handling several tasks with one model are all examples of this. Detecting small objects is still difficult, and a lot of research effort goes into it.

## References

1. Redmon, J., Divvala, S., Girshick, R., Farhadi, A. (2016). [You Only Look Once: Unified, Real-Time Object Detection](https://arxiv.org/abs/1506.02640). CVPR.
2. Redmon, J., Farhadi, A. (2018). [YOLOv3: An Incremental Improvement](https://arxiv.org/abs/1804.02767).
3. Bochkovskiy, A., Wang, C.-Y., Liao, H.-Y. M. (2020). [YOLOv4: Optimal Speed and Accuracy of Object Detection](https://arxiv.org/abs/2004.10934).
4. Wang, C.-Y., Yeh, I.-H., Liao, H.-Y. M. (2024). [YOLOv9: Learning What You Want to Learn Using Programmable Gradient Information](https://arxiv.org/abs/2402.13616).
5. Wang, A. et al. (2024). [YOLOv10: Real-Time End-to-End Object Detection](https://arxiv.org/abs/2405.14458).
6. [Ultralytics YOLO documentation](https://docs.ultralytics.com/)

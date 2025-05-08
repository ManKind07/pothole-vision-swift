
# Pothole Vision - ML-Powered Road Hazard Detection

This project simulates a Flutter application that uses YOLOv8n in TFLite format to detect potholes in real-time from video input.

## Project Overview

Pothole Vision is designed to demonstrate how machine learning can be used to identify road hazards in real-time. The application uses:

- Camera integration for video feed
- TFLite model (YOLOv8n) for object detection
- Real-time bounding box visualization
- Performance optimizations to minimize latency

## Important Note

This is a React-based simulation of how the Flutter app would function. In a real Flutter implementation, you would:

1. Use Flutter's camera package for video input
2. Integrate the TFLite model using Flutter's tflite package
3. Process frames and display detection results with Flutter's Canvas API

## Real Flutter Implementation Guide

To implement this in a real Flutter application:

1. Create a new Flutter project: `flutter create pothole_vision`
2. Add the required dependencies to `pubspec.yaml`:
   ```yaml
   dependencies:
     flutter:
       sdk: flutter
     camera: ^0.10.0
     tflite: ^1.1.2
     path_provider: ^2.0.11
     permission_handler: ^10.0.0
   ```
3. Place your YOLOv8n.tflite model in the assets folder
4. Update your `pubspec.yaml` to include the model:
   ```yaml
   assets:
     - assets/models/YOLOv8n.tflite
   ```
5. Request camera permissions in your AndroidManifest.xml and Info.plist
6. Implement camera initialization and frame processing
7. Apply the TFLite model to each frame and visualize results

## Performance Optimization Tips

For optimal performance in the real Flutter implementation:

- Process frames at a lower resolution than displayed
- Consider skipping frames if processing can't keep up
- Use compute/isolate for model inference to avoid UI freezes
- Apply detection on keyframes only (e.g., every 3-5 frames)
- Ensure the model is optimized for mobile deployment

## Credits

- YOLOv8 by Ultralytics
- This simulation built with React, TypeScript, and Tailwind CSS

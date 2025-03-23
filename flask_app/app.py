from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import cv2
import os

app = Flask(__name__)

model_path = os.path.join(os.getcwd(), "digit_recognition_model.keras")
model = tf.keras.models.load_model(model_path)


@app.route('/predict', methods=['POST'])
def predict_digit():
    file = request.files.get('file')
    if not file:
        return jsonify({"error": "No file uploaded"})

    # Read Image
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_GRAYSCALE)
    if img is None:
        return jsonify({"error": "Invalid image format"})

    # Preprocess Image
    img = cv2.resize(img, (28, 28))
    img = img.astype("float32") / 255.0
    img = img.reshape(1, 28, 28, 1)

    # Predict
    prediction = model.predict(img)
    predicted_digit = np.argmax(prediction)

    return jsonify({"predicted_digit": int(predicted_digit)})

if __name__ == '__main__':
    app.run(debug=True)  # Set debug=False for production

from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image

app = Flask(__name__)

# Load trained model
model = tf.keras.models.load_model("model_training/digit_recognition_model.keras")

@app.route("/predict", methods=["POST"])
def predict():
    file = request.files["image"]
    image = Image.open(file).convert("L")  # Convert to grayscale
    image = image.resize((28, 28))  # Resize to match MNIST dataset
    image = np.array(image) / 255.0  # Normalize
    image = image.reshape(1, 28, 28, 1)  # Reshape for model input

    prediction = model.predict(image)
    predicted_digit = np.argmax(prediction)

    return jsonify({"digit": int(predicted_digit)})

if __name__ == "__main__":
    app.run(debug=True)

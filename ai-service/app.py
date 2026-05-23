from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

responses = {
    "password_reset": "Go to settings and click on 'Reset Password'.",
    "software_install": "Please raise a request for software installation.",
    "network_issue": "Try restarting your router or contact IT support."
}

@app.route("/predict", methods=["POST"])
def predict():
    user_text = request.json["message"]
    X = vectorizer.transform([user_text])
    intent = model.predict(X)[0]

    return jsonify({
        "intent": intent,
        "response": responses.get(intent, "Issue not recognized.")
    })

app.run(port=8000)
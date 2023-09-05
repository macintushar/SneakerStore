import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import spacy

app = Flask(__name__)
CORS(app)

#openai.api_key = "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"


nlp = spacy.load('en_core_web_sm')
entity_labels = {'BRAND': 'brand', 'MODEL': 'model', 'COLOR': 'color', 'SIZE': 'size'}


def extract_entities(text):
    doc = nlp(text)
    entities = {}

    for ent in doc.ents:
        if ent.label_ in entity_labels:
            entities[entity_labels[ent.label_]] = ent.text.lower()
    
    return entities


input_text = "I want Nike Air Force 1's in Black in Size 10"
output = extract_entities(input_text)
print(output)


@app.route("/search")
def NLPSearch():
    try:
        search_term = request.headers['search-term']
        print(search_term)
    except:
        return "<h1>No Search Term</h1>"
   
    input_text = "I want Nike Air Force 1's in Black in Size 10"
    output = extract_entities(input_text)
    print(output)

    return ''

if __name__ == '__main__':
   app.run(debug=True, port=5555)
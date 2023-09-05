import spacy

nlp = spacy.load('en_core_web_lg')
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

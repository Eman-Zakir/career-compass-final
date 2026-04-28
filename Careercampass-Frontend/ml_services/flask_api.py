from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle, numpy as np

app = Flask(__name__)
CORS(app)  # React se connect karne ke liye

model      = pickle.load(open('career_model.pkl','rb'))
le_dict    = pickle.load(open('encoders.pkl','rb'))
le_target  = pickle.load(open('target_encoder.pkl','rb'))

# Pakistan career → internship map
internships = {
    'Software Engineer':    ['Systems Ltd - rozee.pk','10Pearls - 10pearls.com','Arbisoft - arbisoft.com','NetSol - netsol.com'],
    'Data Scientist':       ['Folio3 - folio3.com','Contour Software - contour.com','i2c Inc - i2cinc.com'],
    'Doctor/Medical':       ['Shaukat Khanum - skmt.org','Aga Khan Hospital - aku.edu','PIMS - pims.gov.pk'],
    'Core Engineer':        ['NUST Internship - nust.edu.pk','NESCOM - nescom.gov.pk','WAPDA - wapda.gov.pk'],
    'Business/Management':  ['HBL - hbl.com','MCB Bank - mcb.com.pk','Engro - engro.com'],
    'Finance/Accounting':   ['KPMG Pakistan - kpmg.com/pk','Deloitte Pakistan - deloitte.com','PWC Pakistan - pwc.com/pk'],
    'Educator':             ['Beaconhouse - beaconhouse.edu.pk','The City School - tcs.edu.pk'],
    'Designer':             ['Elance Studio - elancestudio.com','Pixel Force - pixelforce.io'],
    'Network Engineer':     ['PTCL - ptcl.com.pk','Nayatel - nayatel.com','Jazz - jazz.com.pk'],
    'Research/Science':     ['HEC Pakistan - hec.gov.pk','PCSIR - pcsir.gov.pk'],
}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print("Received:", data)

    features = []
    for col in ['gender','intermediate_field','grade_band','primary_interest','primary_skill']:
        val = data.get(col, 'Unknown')
        try:
            enc = le_dict[col].transform([val])[0]
        except:
            enc = 0
        features.append(enc)

    pred_idx = model.predict([features])[0]
    career   = le_target.inverse_transform([pred_idx])[0]
    
    # Top 3 careers with probabilities
    proba     = model.predict_proba([features])[0]
    top3_idx  = np.argsort(proba)[::-1][:3]
    top3      = [{'career': le_target.inverse_transform([i])[0],
                  'confidence': round(proba[i]*100, 1)} for i in top3_idx]

    return jsonify({
        'recommended_career': career,
        'top_3_careers': top3,
        'internships': internships.get(career, [])
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ML Service running ✅'})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
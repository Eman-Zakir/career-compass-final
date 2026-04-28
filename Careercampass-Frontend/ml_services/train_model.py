import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pickle, os

print("📦 Loading datasets...")

# ── Load ──────────────────────────────────────────────
# pehle try karo
df1 = pd.read_csv("C:\\Users\\Admin\\Desktop\\Careercampass-Frontend\\Careercampass-Frontend\\ml_services\\career_recommender.csv")
df2 = pd.read_excel('Student-Employability-Datasets.xlsx')
df3 = pd.read_csv('StudentsPerformance.csv')
# ── DS1: Rename columns ───────────────────────────────
df1.columns = ['name','gender','ug_course','specialization','interests',
               'skills','cgpa','certification','cert_title','is_working',
               'job_title','masters_field']

# ── DS1: Career label banao ───────────────────────────
def map_career(job):
    if pd.isna(job) or str(job).strip() in ['NA','na','']: return None
    job = str(job).lower()
    if any(x in job for x in ['software','developer','web','app','programmer']): return 'Software Engineer'
    elif any(x in job for x in ['data','analyst','ml','ai','scientist']): return 'Data Scientist'
    elif any(x in job for x in ['teacher','professor','lecture','education']): return 'Educator'
    elif any(x in job for x in ['finance','account','bank','audit']): return 'Finance/Accounting'
    elif any(x in job for x in ['doctor','medical','health','pharma']): return 'Doctor/Medical'
    elif any(x in job for x in ['mechanical','civil','electrical','plant']): return 'Core Engineer'
    elif any(x in job for x in ['manager','business','marketing','sales']): return 'Business/Management'
    elif any(x in job for x in ['design','graphic','ui','ux']): return 'Designer'
    elif any(x in job for x in ['network','cyber','security']): return 'Network Engineer'
    else: return None

df1['career_label'] = df1['job_title'].apply(map_career)
df1 = df1.dropna(subset=['career_label'])

# ── DS1: Intermediate field ───────────────────────────
def map_intermediate(ug):
    if ug in ['B.E','B.Tech','BE','Diploma']: return 'Pre-Engineering'
    elif ug in ['B.Pharmacy','B.Sc']:         return 'Pre-Medical'
    elif ug in ['B.Com','BBA','MBA','BMS']:   return 'Commerce'
    elif ug in ['BCA','Bca']:                 return 'Computer-Science'
    elif ug in ['BA','Law Hons']:             return 'Arts'
    else:                                     return 'General'

df1['intermediate_field'] = df1['ug_course'].apply(map_intermediate)

# ── DS1: CGPA → Grade ─────────────────────────────────
df1['cgpa'] = pd.to_numeric(df1['cgpa'], errors='coerce')
def to_grade(c):
    if pd.isna(c): return 'B'
    if c>=80: return 'A'
    elif c>=65: return 'B'
    elif c>=50: return 'C'
    else: return 'D'
df1['grade_band'] = df1['cgpa'].apply(to_grade)

df1['primary_interest'] = df1['interests'].apply(
    lambda x: str(x).split(';')[0].split(',')[0].strip()[:30])
df1['primary_skill'] = df1['skills'].apply(
    lambda x: str(x).split(';')[0].split(',')[0].strip()[:30])

ds1_final = df1[['gender','intermediate_field','grade_band',
                  'primary_interest','primary_skill','career_label']].copy()

# ── DS3: Performance → Career (grade se predict) ──────
df3.columns = ['gender','ethnicity','parent_edu','lunch',
               'test_prep','math_score','reading_score','writing_score']

df3['avg_score'] = (df3['math_score'] + df3['reading_score'] + df3['writing_score']) / 3

def score_to_grade(s):
    if s>=80: return 'A'
    elif s>=65: return 'B'
    elif s>=50: return 'C'
    else: return 'D'

def score_to_career(row):
    s = row['avg_score']
    g = row['grade_band']
    if s >= 80: return 'Data Scientist'
    elif s >= 70: return 'Software Engineer'
    elif s >= 60: return 'Business/Management'
    elif s >= 50: return 'Educator'
    else: return 'Core Engineer'

df3['grade_band'] = df3['avg_score'].apply(score_to_grade)
df3['intermediate_field'] = 'General'
df3['primary_interest'] = 'Technology'
df3['primary_skill'] = 'Analytical'
df3['career_label'] = df3.apply(score_to_career, axis=1)

ds3_final = df3[['gender','intermediate_field','grade_band',
                  'primary_interest','primary_skill','career_label']].copy()

# ── COMBINE ───────────────────────────────────────────
df_combined = pd.concat([ds1_final, ds3_final], ignore_index=True)
df_combined = df_combined.dropna()
print(f"✅ Combined dataset: {len(df_combined)} rows")
print(df_combined['career_label'].value_counts())

# ── ENCODE ────────────────────────────────────────────
le_dict = {}
X_data = df_combined[['gender','intermediate_field','grade_band',
                        'primary_interest','primary_skill']].copy()

for col in X_data.columns:
    le = LabelEncoder()
    X_data[col] = le.fit_transform(X_data[col].astype(str))
    le_dict[col] = le

le_target = LabelEncoder()
y = le_target.fit_transform(df_combined['career_label'])
X = X_data.values

# ── TRAIN ─────────────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=200, random_state=42, class_weight='balanced')
model.fit(X_train, y_train)

preds = model.predict(X_test)
acc = accuracy_score(y_test, preds)
print(f"\n🎯 Model Accuracy: {round(acc*100, 2)}%")

# ── SAVE ──────────────────────────────────────────────
pickle.dump(model,     open('career_model.pkl','wb'))
pickle.dump(le_dict,   open('encoders.pkl','wb'))
pickle.dump(le_target, open('target_encoder.pkl','wb'))
print("✅ Model saved successfully!")
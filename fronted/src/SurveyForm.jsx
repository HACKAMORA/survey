import React, { useState } from "react";
import axios from "axios";

export default function SurveyForm() {
  const [form, setForm] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const submit = async () => {
  try {
    // Liste des champs obligatoires
    const requiredFields = [
      "name",
      "age",
      "region",
      "country",
      "profession",
      "wallet",
      "assets",
      "familiarity",
      "sharedKeys",
      "walletPrivacy",
      "privacyReason",
      "secretOpinion",
      "inheritanceThought",
      "assetLoss",
      "importance",
      "trustSystem",
      "smartContractTrust",
      "preferSystem",
      "interest",
      "adoption",
      "regulation",
      "innovationRegulation"
    ];

    // Vérification : chaque champ doit être rempli
    for (const field of requiredFields) {
      if (!form[field] || form[field].toString().trim() === "") {
        alert(`Please complete the field: ${field}`);
        return;
      }
    }

    // Envoi si tout est rempli
    await axios.post("https://survey-v4py.onrender.com/submit", form);
    setSubmitted(true);
    alert("Response submitted!");
    setForm({});

  } catch (err) {
    alert("Error submitting");
    console.error(err);
  }
};

  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h2>Thank you for your participation</h2>
          <p>Your response has been recorded.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h1 style={styles.title}>
          Survey: Blockchain-Based Digital Asset Inheritance
        </h1>

        <p style={styles.description}>
          This survey aims to understand perceptions and interest in blockchain
          solutions for digital asset inheritance. Your responses remain
          anonymous.
        </p>

        {/* SECTION 1 */}

        <Section title="Section 1 — Participant Information">

          <Input label="Full Name or Fake name" name="name" handleChange={handleChange} />

          <Select
            label="Age group"
            name="age"
            options={["Under 25","25–34","35–44","45–54","55+"]}
            handleChange={handleChange}
          />

          <Select
            label="Region of residence"
            name="region"
            options={[
              "Europe",
              "North America",
              "South America",
              "Asia",
              "Middle East",
              "Africa",
              "North Africa",
              "Australia",
              "Other",
            ]}
            handleChange={handleChange}
          />

          <Input
            label="Country of residence"
            name="country"
            handleChange={handleChange}
          />
           <Input
            label="Profession"
            name="profession"
            handleChange={handleChange}
          />
         

        </Section>

        {/* SECTION 2 */}

        <Section title="Section 2 — Experience with Digital Assets">

          <YesNo
            label="Do you have a cryptocurrency wallet?"
            name="wallet"
            handleChange={handleChange}
          />

          <YesNo
            label="Do you currently hold any digital assets (cryptocurrency, NFTs, tokens)?"
            name="assets"
            handleChange={handleChange}
          />

          <Scale
            label="How familiar are you with DLT/blockchain technologies? (Scale 1–5):
1 = Not familiar,
5 = Very familiar"
            name="familiarity"
            handleChange={handleChange}
          />

        </Section>

        {/* SECTION 3 */}

        <Section title="Section 3 — Privacy and Discretion">

          <YesNo
            label="Have you ever shared your wallet information or private keys?"
            name="sharedKeys"
            handleChange={handleChange}
          />

          <Select
            label="Would you feel comfortable sharing your private keys with family members?"
            name="walletPrivacy"
            options={["Yes","No","Not applicable"]}
            handleChange={handleChange}
          />

          <Select
            label="What is the main reason for keeping your wallet secret?"
            name="privacyReason"
            options={[
              "Security concerns",
              "Privacy / discretion",
              "Lack of trust in others",
              "Other"
            ]}
            handleChange={handleChange}
          />

          <Scale
            label="Do you think most cryptocurrency holders prefer to keep their wallets secret?(Scale 1–5):
1 = Strongly disagree,
5 = Strongly agree"
            name="secretOpinion"
            handleChange={handleChange}
          />

        </Section>

        {/* SECTION 4 */}

        <Section title="Section 4 — Digital Asset Inheritance">

          <YesNo
            label="Have you ever thought about what would happen to your crypto wallet after your death?"
            name="inheritanceThought"
            handleChange={handleChange}
          />

          <Select
            label="Do you think digital assets could be lost if no inheritance plan exists?"
            name="assetLoss"
            options={["Yes","No","Not sure"]}
            handleChange={handleChange}
          />

          <Scale
            label="How important do you think digital asset inheritance is? (Scale 1–5):
1 = Not important,
5 = Very important"
            name="importance"
            handleChange={handleChange}
          />

        </Section>

        {/* SECTION 5 */}

        <Section title="Section 5 — Trust in Blockchain Solutions">

          <Select
            label="Would you be interested in a blockchain-based system that automatically transfers digital assets to heirs after death?"
            name="trustSystem"
            options={["Yes","No","Maybe"]}
            handleChange={handleChange}
          />

          <Scale
            label="Do you think smart contracts can make digital inheritance more secure?(Scale 1–5):
1 = Strongly disagree,
5 = Strongly agree"
            name="smartContractTrust"
            handleChange={handleChange}
          />

          <Select
            label="Would you prefer an automated inheritance system instead of sharing private keys manually?"
            name="preferSystem"
            options={["Yes","No","Not sure"]}
            handleChange={handleChange}
          />

        </Section>

        {/* SECTION 6 */}

        <Section title="Section 6 — Interest in Proposed Solution">

          <Scale
            label="How likely would you be to adopt such a solution if it were available today?(Scale 1–5):
1 = Very unlikely,
5 = Very likely"
            name="interest"
            handleChange={handleChange}
          />

          <Scale
            label="Would you trust a decentralized platform to manage digital inheritance?(Scale 1–5):
1 = Low trust,
5 = High trust"
            name="adoption"
            handleChange={handleChange}
          />

        </Section>

        {/* SECTION 7 */}

        <Section title="Section 7 — Blockchain Regulation">

          <Select
            label="How would you describe the regulatory environment for blockchain and cryptocurrencies in your country?"
            name="regulation"
            options={[
              "Very supportive",
              "Moderately supportive",
              "Unclear regulations",
              "Restrictive regulations",
              "I do not know"
            ]}
            handleChange={handleChange}
          />

          <Scale
            label="Do you believe current regulations encourage innovation in blockchain and crypto?
            (Scale 1–5):
1 = Strongly disagree,
5 = Strongly agree"
            name="innovationRegulation"
            handleChange={handleChange}
          />

        </Section>

        <button style={styles.button} onClick={submit}>
          Submit Survey
        </button>

      </div>
    </div>
  );
}

/* COMPONENTS */

const Section = ({ title, children }) => (
  <div style={styles.section}>
    <h2>{title}</h2>
    {children}
  </div>
);

const Input = ({ label, name, handleChange }) => (
  <div style={styles.group}>
    <label>{label}</label>
    <input style={styles.input} name={name} onChange={handleChange} />
  </div>
);

const Select = ({ label, name, options, handleChange }) => (
  <div style={styles.group}>
    <label>{label}</label>
    <select style={styles.input} name={name} onChange={handleChange}>
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

const YesNo = ({ label, name, handleChange }) => (
  <Select label={label} name={name} options={["Yes","No"]} handleChange={handleChange} />
);

const Scale = ({ label, name, handleChange }) => (
  <Select label={label} name={name} options={["1","2","3","4","5"]} handleChange={handleChange} />
);

/* STYLE */

const styles = {

page:{
  minHeight:"100vh",
  padding:"40px",
  display:"flex",
  justifyContent:"center",
  background:"linear-gradient(135deg,#e0f2fe,#eef2ff,#f5f3ff)",
  fontFamily:"Poppins",
  color:"#1e293b"
},

card:{
  background:"#ffffff",
  maxWidth:"900px",
  width:"100%",
  padding:"45px",
  borderRadius:"14px",
  boxShadow:"0 15px 40px rgba(0,0,0,0.15)"
},

title:{
  fontSize:"30px",
  marginBottom:"10px",
  color:"#1e293b"
},

description:{
  marginBottom:"30px",
  color:"#475569",
  lineHeight:"1.6"
},

section:{
  marginBottom:"35px",
  padding:"20px",
  borderRadius:"10px",
  background:"#f8fafc",
  borderLeft:"6px solid #6366f1"
},

group:{
  marginBottom:"18px",
  display:"flex",
  flexDirection:"column"
},

input:{
  padding:"12px",
  borderRadius:"8px",
  border:"1px solid #cbd5e1",
  marginTop:"6px",
  fontSize:"14px",
  color:"#1e293b",
  background:"#ffffff"
},

button:{
  marginTop:"30px",
  padding:"16px",
  width:"100%",
  background:"linear-gradient(90deg,#6366f1,#4f46e5)",
  color:"white",
  border:"none",
  borderRadius:"10px",
  fontSize:"17px",
  fontWeight:"600",
  cursor:"pointer",
  boxShadow:"0 10px 25px rgba(0,0,0,0.2)"
}


};

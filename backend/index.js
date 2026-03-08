import express from "express";
import cors from "cors";
import { TopicMessageSubmitTransaction } from "@hashgraph/sdk";
import { client } from "./hedera.js";

const app = express();

// Activer CORS
app.use(cors());
app.use(express.json());


const topicId = "0.0.8120935";

// Endpoint pour recevoir les réponses
app.post("/submit", async (req, res) => {
  try {
   const message = `
name:${req.body.name || ""}
age:${req.body.age || ""}
region:${req.body.region || ""}
country:${req.body.country || ""}
profession:${req.body.profession || ""}

wallet:${req.body.wallet || ""}
assets:${req.body.assets || ""}
familiarity:${req.body.familiarity || ""}

shared_keys:${req.body.sharedKeys|| ""}
wallet_private:${req.body.walletPrivacy || ""}
privacy_reason:${req.body.privacyReason || ""}
secret_opinion:${req.body.secretOpinion || ""}

inheritance_thought:${req.body.inheritanceThought|| ""}
asset_loss:${req.body.assetLoss || ""}
importance:${req.body.importance || ""}

trust_system:${req.body.trustSystem || ""}
smart_contract_trust:${req.body.smartContractTrust || ""}
prefer_system:${req.body.preferSystem || ""}

interest:${req.body.interest || ""}
adoption:${req.body.adoption || ""}

regulation:${req.body.regulation || ""}
innovation_regulation:${req.body.innovationRegulation || ""}
`;
    await new TopicMessageSubmitTransaction({
      topicId,
      message,
    }).execute(client);

    res.send("ok");
  } catch (error) {
    console.error(error);
    res.status(500).send("error");
  }
});

app.listen(3001, () => console.log("Backend running on port 3001"));
require("dotenv").config();
const axios = require("axios");
const nodemailer = require("nodemailer");

const getContestInfo = async () => {
  const contestList = await axios.get(
    "https://codeforces.com/api/contest.list"
  );
  return contestList.data.result;
};

const checkTime = async () => {
  const timeDiff1 = 10800; // 3 hrs in seconds
  const timeDiff2 = 3600; // 1 hr in seconds
  let contestList = await getContestInfo();

  for(let i=0; i<contestList.length; i++) {
    if(contestList[i].phase === "BEFORE" && contestList[i].relativeTimeSeconds < 0) {
      if(contestList[i].relativeTimeSeconds == timeDiff1 || contestList[i].relativeTimeSeconds == timeDiff2) {
        const timeLeft = (-1 * contestList[i].relativeTimeSeconds) / 3600
        sendMail(contestList[i].name, timeLeft)
      }
    }
  }
};

const sendMail = async (contestName, timeLeft) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "2002.shaurya@gmail.com",
      pass: "vvtlwqkdzhxbyuwn"
    }
  })

  const options = {
    from: "2002.shaurya@gmail.com",
    to: "f20200615@hyderabad.bits-pilani.ac.in",
    subject: "Codeforces Contest Reminder",
    text: "hello"
  }

  transporter.sendMail(options, function(err, info) {
    if(err) {
      console.log(err);
      return;
    }
    console.log("sent");
  })
};

sendMail()
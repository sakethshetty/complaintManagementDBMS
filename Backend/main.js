const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())

app.get('/dep', (req, res) => {

    const dep = [
        "Department of Agriculture",
        "Department of Commerce",
        "Department of Defense",
        "Department of Education",
        "Department of Energy",
        "Department of Health and Human Services",
        "Department of Homeland Security",
        "Department of Housing and Urban Development",
        "Department of Interior",
        "Department of Justice",
        "Department of Labor",
        "Department of State",
        "Department of Transportation",
        "Department of Treasury",
        "Department of Veterans Affairs"
      ];

    res.status(200).json(dep)
})

app.get('/user', (req, res) => {

    res.status(200).json([
        {
          department: "Health",
          issue: "Lack of hospital beds and ventilators",
          description: "I am a COVID-19 patient and I have been waiting for hours to get admitted to a hospital. There are no beds or ventilators available and the staff are overwhelmed. This is a serious health crisis and the government is not doing enough to help us."
        },
        {
          department: "Education",
          issue: "Poor quality of online classes",
          description: "I am a student and I have been attending online classes since the pandemic started. The quality of the classes is very poor and the teachers are not well-trained. The classes are often interrupted by technical glitches and the content is not engaging. I feel like I am wasting my time and money."
        },
        {
          department: "Transportation",
          issue: "High fare and low frequency of buses",
          description: "I am a commuter and I rely on public buses to travel to work. The fare of the buses has increased significantly and the frequency of the buses has decreased. I have to wait for a long time to catch a bus and sometimes I have to pay extra for a private taxi. This is affecting my budget and my productivity."
        }
      ])
})


app.post('/signup', (req, res) => {

    console.log(req.body)
})

app.post('/login', (req, res) => {

    console.log(req.body)
})

app.get('/dep/:depName', (req, res) => {

  console.log(req.params.depName)

  res.status(200).json([
    {
      department: "Health",
      issue: "Lack of hospital beds and ventilators",
      description: "I am a COVID-19 patient and I have been waiting for hours to get admitted to a hospital. There are no beds or ventilators available and the staff are overwhelmed. This is a serious health crisis and the government is not doing enough to help us."
    },
    {
      department: "Education",
      issue: "Poor quality of online classes",
      description: "I am a student and I have been attending online classes since the pandemic started. The quality of the classes is very poor and the teachers are not well-trained. The classes are often interrupted by technical glitches and the content is not engaging. I feel like I am wasting my time and money."
    },
    {
      department: "Transportation",
      issue: "High fare and low frequency of buses",
      description: "I am a commuter and I rely on public buses to travel to work. The fare of the buses has increased significantly and the frequency of the buses has decreased. I have to wait for a long time to catch a bus and sometimes I have to pay extra for a private taxi. This is affecting my budget and my productivity."
    }
  ])

})

app.listen(5000, () => {
    console.log('Backend is listening!');
})


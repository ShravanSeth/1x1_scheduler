# ADMISSION FORM [YOGA CLASSES]
---

Project Features
```
- Username is always unique(Key Attribute)
- Only people within the age limit of 18-65 can enroll for the monthly classes.
- They can enroll any day but they will have to pay for the entire month.
- The monthly fee is 500/- Rs INR.
- There are a total of 4 batches a day namely 6-7AM, 7-8AM, 8-9AM and 5-6PM.
- Their information will only be updated if they pay fees for a new month.
```

Implementation Details

```
1. A Simple form is made using React as the basic Frontend language.
2. Details of the user are accepted and a call is made to the REST API.
3. We have assumed a mock function that does the payment for us.
4. On successful payment, details are updated on the Database.
5. The site is currently hosted live at https://flexmoney-yoga-form.netlify.app while the backend is hosted separately for production purposes at https://flexmoney-backend.herokuapp.com/
```

# API DOCUMENTATION
---

1. / - GET
```
RESPONSE
    {
    success:true,
    message: "API is Running"
    }
```

2. /fees/payfees - POST
```
REQUEST
{
  "username":"xoz",
  "age":"50",
  "feesOfMonth":"2022-01",
  "batch":"5 - 7 AM"
}
```
```
RESPONSE
    - FOR NEW USER
        {
        success:true,
        message:"Fees Paid Successfully"
        }
        
    - FOR EXISTING USERS (PAYING FEES FOR A NEW MONTH)
      - SUCCESS
        {
        success:true,
        message:"Fees Updated Successfully"
        }
      - FAILURE
        {
        success:false,
        message:"You have already paid the fees for this month"
        }
    - FAILURE
       {
       success:false,
       message:"Some error occured"
       }    
```

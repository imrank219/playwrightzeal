const { test, expect } = require('@playwright/test');
//import * as OTPAuth from "otpauth";

export class Loginpage{

    constructor(page){

        this.page = page;
        this.email = page.locator("input[name='email']")
        this.password = page.locator("input[name='password']")
        this.signin = page.locator(".dashboardSignInBtn")
        this.errormsg = page.getByText('Please enter a valid email address.')
        this.invalidpwd = page.locator(".error.message.ui")
        this.dashboard = page.locator('#bodyContentContainer div').filter({ hasText: 'Columbia Engineering Cybersecurity Boot Camp' }).nth(3)
        this.startnow = page.locator(".getStarted")
        this.sfusername = page.locator("input#username")
        this.sfpassword = page.locator("input#password")
        this.sfloginbutton = page.locator("input#Login")
        this.googlesignin = page.locator("xpath=//*[text()='Sign in with your 2U.com email']")
        this.loginingoogle = page.locator("xpath=//*[@id='identifierId']")
        this.nextbutton2 = page.locator("xpath=//*[text()='Next']")
      //  this.passwordgoogle = page.locator("xpath=//*[@name='password']")
        this.passwordgoogle = page.locator("xpath=(//*[@type='password']) [1]")
        this.nextbutton = page.locator("#identifierNext")
        this.emailgreen = page.locator("input#user_email");
        this.emailsubmitnext = page.locator("#submit_email_button span")
        this.passwordgreen = page.locator("input#user_password")
        this.passwordsubmit = page.locator("[data-submit-path] .button-wrapper #submit_password_button")
        this.emaillogin = page.locator("input#emailAddress")
        this.passwordlogin = page.locator("input#password")
        this.submitbutton = page.locator("button#loginSubmit")
        this.passworderror = page.locator("xpath=//*[text()='Enter a password']")
        this.skeduloemail = page.locator("input[name='email']")
        this.skedulopwd = page.locator("input[name='password']")
        this.skedulogin = page.locator("button[name='submit'] > .auth0-label-submit")
        this.portalhamburgermenu = page.locator(".headerMenuBarIcon")
        this.profileicon = page.locator(".angle.down.icon.small")
        this.logout = page.locator(".item:nth-of-type(3) .dropdownInfoText")
        this.logoutmessage = page.getByText('You have been logged out successfully.')
        this.okbutton = page.getByRole('button', { name: 'Ok' })
        this.signinpage = page.getByRole('heading', { name: 'Sign In' })
        this.changepasword = page.locator(".item:nth-of-type(2) .dropdownInfoText")
        this.newpwd = page.locator("input[name='newPassword']")
        this.confirmpwfd = page.locator("input[name='confirmNewPassword']")
        this.updatebutton = page.locator(".primary")
        this.pwdchangemessage = page.locator("xpath=//*[text()='Password changed']")
        this.helplink = page.locator("xpath=//*[text()='help.']")
        this.needassistance = page.locator("xpath=//*[text()='Need assistance?']")
        this.callassistance = page.locator("xpath=//*[text()='Call admissions']")
        this.makeappointment = page.locator("xpath=//*[text()='Make an appointment']")
        this.calendly = page.locator("/html//div[@id='root']/div/div//h2[@class='VZBdEOD1lcfdMo42msQh _bxUE0aLh6kg2O82sEF0']")
        this.manageprofile = page.locator(".dashboard-menu-item:nth-of-type(1) .item:nth-of-type(1) .dropdownInfoText")
        this.userprofile = page.locator("xpath=//*[text()='User Profile']")
        this.phonenumber = page.locator("input[name='phoneNumber']")
        this.profileupdate = page.locator("xpath=//*[text()='Profile updated successfully.']")
        this.goback = page.locator(".form.ui > a[role='button']")
        this.newphonenumber = page.getByPlaceholder('Enter your phone number')
        this.invalidloginmsg = page.getByText('Wrong email or password.')
        //MITCO

        this.loginnamemit = page.locator("xpath=(//*[@id='outlined-basic']) [1]")
        this.passwordmitco = page.locator("xpath=(//*[@id='outlined-basic']) [2]")
        this.submitbutton = page.locator("xpath=//*[@type='submit']")
        
    }

    visit = async () =>{


        await this.page.goto("http://columbia-us.uat.trilogyed.com/enroll/ui/signin/")
    }

    visitregister = async () =>{

        // await this.page.goto("https://columbia3.uat.trilogyed.com/enroll/ui/signIn")
         //http://columbia-us.uat.trilogyed.com/enroll/ui/signin/
         await this.page.goto("https://upenn-us.uat.trilogyed.com/enroll")
         await this.email.fill("mjames2444@mailinator.com")
         await this.password.fill("Test1234!")

     }

     visitregisterassess = async () =>{

     
         await this.page.goto("https://upenn-us.uat.trilogyed.com/enroll")
       

     }

    invalidlogin = async () =>{

                
      //  await this.email.waitFor();
        await this.email.fill("test223");
        await this.password.fill("Test1234!");
        await this.signin.click();
        await this.errormsg.waitFor();
        var errorpassword = await this.errormsg.innerText();
        await expect(this.errormsg).toHaveText(errorpassword);
        console.log(errorpassword);

        //invalid password but valid userid
        await this.email.fill("");
        await this.email.fill("jhouston123@mailinator.com");
        await this.password.fill("Test");
        await this.signin.click();
        await this.invalidpwd.waitFor();
        var errorpassword2 = await this.invalidpwd.innerText();
        await expect(this.invalidpwd).toHaveText(errorpassword2);
        console.log(errorpassword2);

        //invalid userid but valid password

        await this.email.fill("");
        await this.email.fill("jamestester45@mailinator.com");
        await this.password.fill("");
        await this.password.fill("Test1234!");
        await this.signin.click();
        await this.invalidpwd.waitFor();
        var errorpassword2 = await this.invalidpwd.innerText();
        await expect(this.invalidpwd).toHaveText(errorpassword2);
        console.log(errorpassword2);

        //valid userid and pwd
        await this.email.fill("");
        await this.email.fill("markauto01@mailinator.com");
        await this.password.fill("");
        await this.password.fill("Test1234!");
        await this.signin.click();
        await this.dashboard.waitFor();
    //    await this.page.pause();
        await expect(this.dashboard).toBeVisible();

    }

    registerportal = async () =>{

        await this.startnow.click();

    }

    visit2 = async () =>{
  

        await this.page.goto("https://trilogyed--uat.sandbox.my.salesforce.com/");
       
      //  await this.sfusername.fill("aadhikari+autouser@2u.com.uat");
     //   await this.sfpassword.fill("Trilogy1234!");
      //  await this.sfloginbutton.click();
    }

    visit3 = async () =>{

      //  await this.page.goto("https://trilogyed--uat.sandbox.lightning.force.com/lightning/r/Class__c/a0L78000000Nj4TEAS/view");
      //  await this.page.goto("https://trilogyed--uat.sandbox.lightning.force.com/lightning/r/Class__c/a0L78000000O4p5EAC/view");
        //https://trilogyed--uat.sandbox.lightning.force.com/lightning/r/Class__c/a0LDi000009EiyMMAS/view
        await this.page.goto("https://trilogyed--uat.sandbox.lightning.force.com/lightning/r/Class__c/a0LDi000009EiybMAC/view");
      //  await this.sfusername.fill("aadhikari+autouser@2u.com.uat");
      //  await this.sfpassword.fill("Trilogy1234!");
      //  await this.sfloginbutton.click();
        console.log("Logging into Salesforce")
    }

    visitgreenhouse = async () =>{
         const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
         await delay(3000);
       // page = Browser.new_page();
        console.log("Navigate into Greenhouse")
        await this.page.goto("https://app2.greenhouse.io/dashboard");
        await this.emailgreen.fill("Ndiminico+sandbox@2u.com");
        console.log("Fill out user name");
        await this.emailsubmitnext.click();
        await this.passwordgreen.fill("Passat00!");
        console.log("Fill out password");
        await this.passwordsubmit.click();
        console.log("Logging into Greenhouse");
    }

    visitinstructorconnect = async () => {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        
        await this.page.goto("https://instructorconnect.staging.bootcampspot.com/login");
        await this.googlesignin.click();
        await this.loginingoogle.waitFor();
        await this.loginingoogle.fill("itestuser@dev.2tor.com");
        console.log("Username filled");
        await this.nextbutton.click();
        await delay(1000);
  
        await this.passwordgoogle.click();
        await this.page.keyboard.type("LHamil44!", {delay: 400});
     
        await delay(3000);
        console.log("Password filled");

        await this.nextbutton2.click();
        const passwordmessage = await this.passworderror.isVisible();

        if(passwordmessage){
            console.log("Error message visible");

        }else if(!passwordmessage){
            console.log("ERROR NOT SEEN");
        }else{

        }


        console.log("Logging into instructor connect");
    
        await delay(12000);
        await this.page.screenshot({path: 'screenshot.png'});
        
  

    }

    visitinstructorconnect2 = async () => {
       
   
        await this.page.goto("https://instructorconnect.staging.bootcampspot.com/login");
        await this.googlesignin.click();
        await this.loginingoogle.waitFor();
        await this.loginingoogle.fill("itestuser@dev.2tor.com");
        await this.nextbutton.click();
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        await delay(1000);
  
        await this.passwordgoogle.fill("MPtest1234!");
       // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
       // await delay(1000);


        await this.nextbutton2.click();
        await delay(10000);

        await this.page.context().storageState({ path: 'authimran2.json' })       


    }

    tutorlogin = async () => {

        await this.page.goto("https://idp-test.bootcampspot.com/ui/");
        await this.emaillogin.fill("jgutierrez+9001@2u.com");
        await this.passwordlogin.fill("Password!3");
        await this.submitbutton.click();
        
    }

    dataprovisioning = async () =>{

        await this.page.goto("https://trilogyed--uat.sandbox.lightning.force.com/lightning/r/Class__c/a0L6S00000prZ14UAE/view");
       // await this.sfusername.fill("aadhikari+autouser@2u.com.uat");
       // await this.sfpassword.fill("Trilogy1234!");
       // await this.sfloginbutton.click();
        console.log("Logging into SF");
        
    } 
    visitcookiesf = async () =>{
  

        await this.page.goto("https://trilogyed--uat.sandbox.my.salesforce.com/");
       
       // await this.sfusername.fill("aadhikari+autouser@2u.com.uat");
        await this.sfusername.fill("ikhan+autouser@2u.com.uat");
        //ikhan+autouser@2u.com.uat
      //  await this.sfpassword.fill("Trilogy1234!");
        await this.sfpassword.fill("Trilogy12345!");
        //Trilogy12345!
        await this.sfloginbutton.click();
        await this.page.context().storageState({ path: 'authimran6.json' })  
    }

    visitcookiesic = async () =>{
  

        await this.page.goto("https://instructorconnect.staging.bootcampspot.com/login");
        await this.googlesignin.click();
        await this.loginingoogle.waitFor();
      //  await this.loginingoogle.fill("itestuser@dev.2tor.com");
        await this.loginingoogle.fill("iautomationuser@dev.2tor.com");
        await this.nextbutton.click();
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        await delay(1000);
  
        await this.passwordgoogle.fill("MPtest1234!");
       // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
       // await delay(1000);


        await this.nextbutton2.click();
        await delay(10000);

        await this.page.context().storageState({ path: 'authimran10.json' })       


    }

    logininstructorconnectflow = async () => {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
       
        await this.page.goto("https://instructorconnect.staging.bootcampspot.com/login");
        await delay(2000);
        const googlesign = await this.page.locator("xpath=//*[text()='Sign in with your 2U.com email']").isVisible();

        if(googlesign){
        
        await this.page.locator("xpath=//*[text()='Sign in with your 2U.com email']").click();
        }
        else{
            console.log("GMAIL LOGIN : SIGN IN NOT VISIBLE ")
        }

 

    }

    visitskedulo = async () =>{

        await this.page.goto("https://twou2.my.skedulo.com");

        await this.skeduloemail.fill("ikhan+sb@2u.com");
        await this.skedulopwd.fill("Test1234!");
        await this.skedulogin.click();

        

    }

    visitskeduloinvalid = async () =>{

      await this.page.goto("https://twou2.my.skedulo.com");

      await this.skeduloemail.fill("test@123.com");
      await this.skedulopwd.fill("Test!");
      await this.skedulogin.click();
      await expect(this.invalidloginmsg).toBeVisible();

      

  }

    visitcookiesicnotutor = async () =>{
  

        await this.page.goto("https://instructorconnect.staging.bootcampspot.com/login");
        await this.googlesignin.click();
        await this.loginingoogle.waitFor();
      //  await this.loginingoogle.fill("itestuser@dev.2tor.com");
        await this.loginingoogle.fill("inotutor2@dev.2tor.com");
        await this.nextbutton.click();
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        await delay(1000);
  
        await this.passwordgoogle.fill("MPtest1234!");
       // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
       // await delay(1000);


        await this.nextbutton2.click();
        await delay(10000);

        await this.page.context().storageState({ path: 'authimran9.json' })       


    }


    portallogoutflow = async () =>{

        
          //valid userid and pwd
          await this.email.fill("");
          await this.email.fill("markauto01@mailinator.com");
          await this.password.fill("");
          await this.password.fill("Test1234!");
          await this.signin.click();
          await this.dashboard.waitFor();
      //    await this.page.pause();
          await expect(this.dashboard).toBeVisible();

          //Select logout
          await this.portalhamburgermenu.click();
          await this.profileicon.click();
          await this.logout.click();
          //Vlidate logout message
          await this.logoutmessage.waitFor();
          await expect(this.logoutmessage).toBeVisible();
          await this.okbutton.click();
          await this.signinpage.waitFor();



  
      }

     validlogin = async () =>{

                
       
          //valid userid and pwd
          await this.email.fill("");
          await this.email.fill("markauto01@mailinator.com");
          await this.password.fill("");
          await this.password.fill("Test1234!");
          await this.signin.click();
          await this.dashboard.waitFor();
          await expect(this.dashboard).toBeVisible();
  
      }

      changepwd = async () =>{
        await this.portalhamburgermenu.click();
        await this.profileicon.click();
        await this.changepasword.click();
        await this.newpwd.fill("Test1234!");
        await this.confirmpwfd.fill("Test1234!");
        await this.updatebutton.click();
        await expect(this.pwdchangemessage).toBeVisible();

      }

      helplinks = async () =>{
         await expect(this.helplink).toBeVisible();
         await this.helplink.click();
         await expect(this.needassistance).toBeVisible();
         await expect(this.callassistance).toBeVisible();
         await expect(this.makeappointment).toBeVisible();
         await this.makeappointment.click();
      




      }

      manageprofiles = async () =>{
        await this.portalhamburgermenu.click();
        await this.profileicon.click();
        await this.manageprofile.click();
        await expect(this.userprofile).toBeVisible();
        const phonenumber2 = "321321321";
        await this.phonenumber.fill("");
        await this.phonenumber.fill(phonenumber2);
        await this.updatebutton.click();
        await expect(this.profileupdate).toBeVisible();
        await this.goback.click();
        await this.portalhamburgermenu.click();
    //    await this.profileicon.click();
        await this.manageprofile.click();
    //    var phonevalidation = await this.page.locator("xpath=//*[@value='"+phonenumber2+"']").getByValue();
    //    console.log(phonevalidation);
    //    await expect(this.phonevalidation).toBeVisible();
     //   await expect(this.phonenumber).toContainText(phonevalidation);
      //  var textLocator = await this.page.locator("xpath=//*[@value='"+phonenumber2+"']").innerText().valueOf();
    //    var phonetext = textLocator.textContent();
        const textLocator = this.page.locator("xpath=//*[@value='"+phonenumber2+"']").getByText(phonenumber2);
     //   await expect(this.page.locator("xpath=//*[@value='"+phonenumber2+"']").toBeVisible());
     //   let val = (await this.page.locator("xpath=//*[@value='"+phonenumber2+"']")).textContent();
     //   var textLocator2 = textLocator.getByText();
    //    await expect(this.textLocator).toBeVisible();
        console.log(textLocator);
        const textnewloc = textLocator.getByText();
      //  let val2 = await this.phonenumber.textContent();
        console.log(textnewloc);

        await expect(textLocator !== undefined).toBeTruthy();
      //  await expect(this.newphonenumber).toHaveText(phonenumber2);
    
        await this.phonenumber.fill("");
        await this.phonenumber.fill("222222222");
        await this.updatebutton.click();
        await expect(this.profileupdate).toBeVisible();



       

      }

      visitmitco = async () =>{
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        await delay(4000);
        await this.page.goto("https://demo.csa.mitco.com/");
        await delay(4000);
        await this.loginnamemit.fill("imran@fountain-city.com");
        await this.passwordmitco.fill("temp123456");
        await this.submitbutton.click();

      }

      visitmitcox = async () =>{
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
     //   await delay(4000);
        await this.page.goto("https://demo.csa.mitco.com/");
    //    await delay(4000);
        await this.loginnamemit.fill("imran@fountain-city.com");
        await this.passwordmitco.fill("temp123456");
        await this.submitbutton.click();

      }

      




    

 
}
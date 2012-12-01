var nodemailer = require("nodemailer");

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Code for America' })
};

exports.emailForm = function(req, res) {
  var params = req.body;
  console.log(params);
  
  // create reusable transport method (opens pool of SMTP connections)
  var smtpTransport = nodemailer.createTransport("SMTP",{
      service: "Gmail",
      auth: {
          user: "email",
          pass: "password"
      }
  });
  
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: "Code for America <hweber@codeforamerica.com>", // sender address
      to: params.email, // list of receivers
      subject: "Welcome to Code for America!", // Subject line
      text: "Hello "+params.name+"!", // plaintext body
      html: "<b>Hello!</b>" // html body
  }

  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
      }else{
          console.log("Message sent: " + response.message);
      }

      var mailOptions2 = {
          from: "Code for America <hweber@codeforamerica.com>", // sender address
          to: "hweber@codeforamerica.com", // list of receivers
          subject: "Code for America Sign Up Confirmation", // Subject line
          text: "Name: "+params.name+", Organization: "+params.organization+", Email: "+params.email+".", // plaintext body
          html: "<b>Hello!</b>" // html body
      }

      smtpTransport.sendMail(mailOptions2, function(error, response){
          if(error){
              console.log(error);
          }else{
              console.log("Message sent: " + response.message);
          }
          // if you don't want to use this transport object anymore, uncomment following line
          smtpTransport.close(); // shut down the connection pool, no more messages
      });
  });
  
  res.redirect('/form.html');
}
import * as sendgrid from 'sendgrid';
const helper = sendgrid.mail;
const sg = sendgrid(process.env.SENDGRID_API_KEY || '');

export function sendEmail(to: string, from: string, subject: string, message: string) {
    console.log('In the email.svc');
    let toEmail = new helper.Email(to);
    let fromEmail = new helper.Email(from);
    let emailContent = new helper.Content('text/html', message);

    let mail = new helper.Mail(fromEmail, subject, toEmail, emailContent);
    
    let request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });
    console.log(request.body);
    return sg.API(request);
}
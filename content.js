let emailPattern = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/g;
let phonePattern = /(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?(\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4})/g;

let emails = [...new Set(document.body.innerText.match(emailPattern) || [])];
let phones = [...new Set(document.body.innerText.match(phonePattern) || [])];

({website: window.location.href, emails: emails, phones: phones});

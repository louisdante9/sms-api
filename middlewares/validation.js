
const checkNumber = value => Number.parseInt(value, 10);
const checkPhoneNumber = value => /^([0-9-+]{7,11})$/.test(value);
const trimWhiteSpaces = (param, value) => (param || '')
  .trim()
  .replace(/\s+/g, value || ' ');
export const response = (res, status, data) => res.status(status).json(data);

export const validateContact = (contact) => {
    const { name, phoneNumber } = contact;

    const parsedName = trimWhiteSpaces(name);
    const parsedPhoneNumber = checkPhoneNumber(phoneNumber);

    if (parsedName.length < 2 || !parsedPhoneNumber) {
        return false;
    }

    return {
        ...contact,
        name: parsedName,
        phoneNumber,
    };
};


export const validateMessage = (message) => {
    const { content, senderId, receiverId } = message;

    const parsedContent = trimWhiteSpaces(content);
    const parsedSenderId = checkPhoneNumber(senderId);
    const parsedReceiverId = checkPhoneNumber(receiverId);

    if (parsedContent < 2 || !parsedSenderId || !parsedReceiverId) {
        return false;
    }

    return {
        ...message,
        content: parsedContent,
        senderId,
        receiverId,
    };
};

export const validatePhone = (req, res, next) => {
    const { id } = req.params;

    const validPhoneNumber = checkPhoneNumber(id);
    if (validPhoneNumber) {
        req.id = id;
        return next();
    }

    return response(res, 422, { error: 'Invalid Phone Number provided' });
};

export const validateId = (req, res, next) => {
    const { id } = req.params;

    const validId = checkNumber(id);
    if (validId) {
        req.id = validId;
        return next();
    }

    return response(res, 422, { error: 'Invalid Message Id provided' });
};
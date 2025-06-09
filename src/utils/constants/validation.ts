export const EmailRegex =
	/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
export const PasswordRegex =
	/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

export const PasswordRegexMessage =
	'Password must be at least 6 characters long, contain at least one uppercase letter, one digit, and one special character.';

export const MinimumUsernameLength = 3;
export const MaximumUsernameLength = 50;

export const MinimumNameLength = 3;
export const MaximumNameLength = 100;

export const MinimumAddressLength = 5;
export const MaximumAddressLength = 300;

export const PhoneNumberRegex =
	/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;

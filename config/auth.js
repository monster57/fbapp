module.exports = {

    'facebookAuth' : {
        'clientID'      : '1208765219157976', // your App ID
        'clientSecret'  : 'c1eaa08ee1983729262e421ec2a050dd', // your App Secret
        'callbackURL'   : 'http://localhost:3000/users/auth/facebook/callback',
        'profileFields' : ['id', 'name','picture.type(large)', 'emails', 'displayName', 'about', 'gender']
    }

};
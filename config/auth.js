module.exports = {

    'facebookAuth' : {
        'clientID'      : '1663422440558006', // your App ID
        'clientSecret'  : '0a721b0482e72338e92eb2894814136b', // your App Secret
        'callbackURL'   : 'http://localhost:3000/users/auth/facebook/callback',
        'profileFields' : ['id', 'name','picture.type(large)', 'emails', 'displayName', 'about', 'gender']
    }

};

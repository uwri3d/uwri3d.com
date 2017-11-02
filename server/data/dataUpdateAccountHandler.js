import Account from './models/account';

const dataUpdateAccountHandler = async (req, res, next) => {
  const account = JSON.parse(req.get('Payload')).account;
  const accounts = await Account.find({email: account.email}, (err, accounts) => accounts);
  if (accounts[0] !== undefined) {
    accounts[0].information = account.information;
    accounts[0].buildTeamApplication = account.buildTeamApplication;
    accounts[0].save();
    res.set('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({type: 'success', message: 'Application Saved!'}));
  } else {
    res.set('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({type: 'error', message: 'Account missing.'}));
  }
};

export default dataUpdateAccountHandler;
var exec = require('child_process').exec,
    JiraApi = require('jira').JiraApi;

// Consts
const PLUGIN_NAME = 'retrieve-tag';
const CMDS = {
    message: 'git show --pretty=format:"%s"',
    branch: 'git rev-parse --abbrev-ref HEAD'
};

module.exports = {

    /**
     * Retrieve the branch name or last git message and extract a regular expression
     *
     * @param {String} loc
     * @param {Regex} regExpr
     *
     * @return {String}
     */
    retrieveTag: function(loc, regExpr) {
        var cmd = CMDS[loc.toLocaleLowerCase()];

        if(cmd){
            return exec(cmd, function (err, stdout, stderr) {
                if (err || stderr) {
                    throw new Error ("retrieveTag: Error on git " + loc + " extraction.");
                }

                return regExpr.exec(stdout.trim());
            });
        } else {
            throw new Error ("retrieveTag: Error on location (" + loc + ") input");
        }
    },

    /**
     * Function to get components from a Jira ticket using where the ticket number is extracted from a regex in a git
     * message or branch name.
     * Uses the JiraApi node module
     *
     * @param protocol
     * @param host
     * @param port
     * @param user
     * @param password
     * @param apiVersion
     * @param issueNum
     * @param loc
     * @param searchText
     */
    getJiraComponents: function(protocol, host, port, user, password, apiVersion, issueNum, loc, searchText) {

        var jira = new JiraApi(protocol, host, port, user, password, apiVersion);
        var iN = retrieveTag(loc, searchText) || issueNum;

        if(!issueNum) {
            throw new Error('Cannot look up component. No Jira ticket number provided.')
        }

        return jira.findIssue(iN, function(err, issue){
            if(err){
                throw new Error ('Jira Api: ' + err);
            }

            return issue.fields.components;
        });
    }
};
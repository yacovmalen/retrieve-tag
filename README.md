# Retrieve Tag for Git #

A node js module to extract a known string or tag from a Git branch name or Git commit message. If the tag is a Jira
issue number, it can be used to get the components of the ticket from a Jira project.

JIRA REST API documentation can be found [here](http://docs.atlassian.com/jira/REST/latest/)

## Installation ##

## Use Case##
The use case for this module is the ability to grab a tag that a developer either puts in the branch name or the last
commit message and be able to do tasks based on the tag.

Specifically, it is designed that such that a developer can place a Jira ticket in the branch name and can use that tag
to get the components of the Jira ticket. When the developer pushes the branch, a specific set of sanity tests can be run
based on the component in the Jira ticket (allowing for a more accurate set of tests to be run locally before the code is
pushed).

For example:
A project has two components, page 1 and page 2. A sanity test is always run when the code is pushed, but when pushing
code for page 1, there is no need to run tests on page 2, so, in order to for the developer to ensure that only the code
that is being push is tested, the command for which sanity to run (example: using gulp tasks) is determined by the component
of the jira ticket.

A developer is working on jira ticket Jira-123. The developer creates a working branch with the name working-branch/Jira-123
In the git pre-push process, the tag is extracted from the branch name and the component for Jira comes back as page 1.
Then the page 1 sanity test is run.

## Usage Example ##
User is working on Git branch 'working-branch/working-123'

Get the tag working-123:

var tag = retrieveTag('branch', 'working-123');
console.log(tag); //working-123

## Options ##

retrieveTag options:
* `Location<string>`: Location to extract the tag from ('Branch' or 'Message')
* `Regex<regEx>`: Search string

getJiraComponents and JiraApi options:
*  `protocol<string>`: Typically 'http:' or 'https:'
*  `host<string>`: The hostname for your jira server
*  `port<int>`: The port your jira server is listening on (probably `80` or `443`)
*  `user<string>`: The username to log in with
*  `password<string>`: Keep it secret, keep it safe
*  `Jira API Version<string>`: Known to work with `2` and `2.0.alpha1`
*  `verbose<bool>`: Log some info to the console, usually for debugging
*  `strictSSL<bool>`: Set to false if you have self-signed certs or something non-trustworthy
*  `issueNum<string>`: User can provide either the issue number or the location of the tag (branch, message) and the search string
*  `loc<string>`: String for tag location (should be null if issueNum is provided)
*  `searchText<string>`: Search text for tag (should be null if issueNum is provided)

## TODO ##
Additional unit testing

## Changelog ##
0.1.0: Initial Commit
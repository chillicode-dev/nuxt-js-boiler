# Contributing
### Git
#### Branches
The project must have 2 branches:
- `master` - release versions of the project (tagged by version numbers)
- `dev` - branch for deploying to dev-server

These 2 main branches should have CI/CD pipelines for automated testing and deployment to dev and stage servers.

Another branches are used by developers and will be merged to `dev` branch in the future.

To start development you got to stick to the following rules:
1. Fork from the current `dev` branch
1. Start naming with the name of the type of action that we perform in this branch
   (`feature`, `hotfix`, `support`, `release`). For example: `feature/..`
1. After the slash, put the task number from the task tracker and briefly describe the actions that you perform in this branch (only lowercase letters and a hyphen). For example: `feature/1337-responsive-header`
1. After making the changes, make a Merge Request to `dev`

Hence, the order of the merge is as follows:
```
feature/1-feature-title -> dev -> master
```

#### Commits
All commit names must be in English and begin with a capital letter.
If the changes affected only one file, you should first indicate its name, for example:
```
Button.js: Change text styles
```

Do not use `fix bugs`-style commit names.

Always start commit with a verb (for example: Add, Fix, Update, Remove, Rename, Delete, etc.),
or with the name of the file/folder which was changed.

The commit message should roughly match the following rule:
```
{Place}: {action} + {subjects}
```
or:
```
{Action} + {subjects} in {place}
```

For example, we need to change some prop in the component `/components/Button/Button.vue`, then the name of the commit will be:
```
Button.vue: change 'isVisible' prop logic
```
or:
```
Change 'isVisible' prop logic in Button.vue
```

#### Merge Requests
To create MR before deploying new features:
1. Go to the "Merge Requests" section in the project repository and click "New Merge Request"
1. Select as a "Source branch" your branch with features/bug fixes, and as "Target branch" branch `dev`
1. "Title" should begin with the task number in the task tracker. After that, enter briefly what was done. For example: `# 1337 create responsive header`
1. If the work is not completed, put the prefix `WIP:` before the MR name. For example: `WIP: #1337 create responsive header`
1. Set team leader of the project as "Assignee"
1. Click "Delete source branch when merge request is accepted" if you want to delete the branch after the merge
1. Click "Submit merge request"
1. After the successful completion of the pipelines and the confirmation of the merge request, team lead should checkout `dev` branch and pull changes. Then he increases version number using the command `npm version patch` and push tags to the repository

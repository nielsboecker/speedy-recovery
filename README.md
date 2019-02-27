<p align="center">
  <a href="https://dev.azure.com/ucabnbo/Speedy%20Recovery/_build/latest?definitionId=1" alt="Build Status">
    <img src="https://dev.azure.com/ucabnbo/Speedy%20Recovery/_apis/build/status/speedy-recovery-rg%20-%20CI" />
  </a>
  
  <a href="https://github.com/nbckr/speedy-recovery/pulls" alt="Pull Requests Welcome">
    <img src="https://camo.githubusercontent.com/7509b1327eb1be79c73071b83001358349629e81/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5052732d77656c636f6d652d6666363962342e737667" />
  </a>
  
  <a href="https://donate.gosh.org/" alt="Donate to Charity">
    <img src="https://camo.githubusercontent.com/ff07592344dc21c343e4180648b2155a6a899ad7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f446f6e6174652d436861726974792d6f72616e67652e737667" />
  </a>
</p>

<p align="center">
    <img src="./speedy-recovery-client/public/images/logo_with_title.png" height="120">
</p>

# Speedy Recovery
**A patient-centred app based on the FHIR standard facilitating communication between paediatric patients, parents and hospital staff**

## About
[Speedy Recovery](https://speedyrecovery.z6.web.core.windows.net) is a SMART on FHIR enabled web application providing clinical information, a calendars displaying medical appointment, and messaging to paediatric patients, as well as their parents and the relevant healthcare providers. It is developed in a cooperation between University College London (UCL) and Great Ormond Street Hospital (GOSH).

[GOSH](https://www.gosh.nhs.uk/) and their digital unit [GOSH DRIVE (Digital Research Informatics and Virtual Environments)](https://www.gosh.nhs.uk/news/latest-press-releases/new-unit-opening-great-ormond-street-hospital-set-revolutionise-how-technology-used-hospitals) are committed to making young patients’ hospital stays as tolerable as possible. Inherently, this goal can only be achieved if parents are assured and confident, and hospital staff is well-informed and approachable. 

We aim to use modern technology to help GOSH in their pursuit of their goals and generally explore the potential of patient-centred software in healthcare. Therefore, we will develop a web app that serves three different user groups: patient, parent and proviider. The app will display a calendar that is tailored to the respective user’s needs. 

The project makes use of the cutting-edge healthcare data standard FHIR (Fast Healthcare Interoperability Resources), which is still in its draft phase, but is believed to revolutionise the health IT landscape. The project explores the opportunities of this young, evolving standard, together with the SMART on FHIR technology that builds on top of it. 

## Front-End
The React client application can be found in the `/speedy-recovery-client` directory.

### Development

#### `yarn install`
Installs all required dependencies.

#### `yarn start`
Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.

#### `yarn build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

### Deployment
The app is currently deployed via Azure DevOps pipelines. Merge your changes into the `master` branch and trigger a release.

## Back-end
Most back-end services are carries out through the SMART on FHIR sandbox. A distinct  back-end is being implemented to add some features and can be found at [speedy-recovery-server](https://github.com/JustinYaaang/speedy-recovery-server/).

-----

# Licence

_Speedy Recovery -- A patient-centred app based on the FHIR standard facilitating communication between paediatric patients, parents and hospital staff_

_Copyright (C) 2019 University College London_

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/license/>.


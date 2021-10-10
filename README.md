# Instructions for Robots on Mars.

## Running the App

You will need to have [https://nodejs.org/](Node JS) installed on your system.
The app was authored using node v12.16.3, so anything equal or above this will definitely work
Most versions will probably work as well.

After cloning the repo, navigate to the directory and type

`npm install`

This will fetch all the packages required to run the app. It shouldn't take more than a few minutes.

When this has finished running, type

`npm start`

This runs the app in development node. The app is ready to view when the 'Compiled successfully!' message appears in the terminal

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To stop the app running, press ctrl C

To run the tests, type

`npm test` and press 'a' to run all tests

You will need to do this in another command prompt / terminal window if you want to do it while the app is running.

## Using the App

If you have run the app successfully, you should see an inout panel on the left, and an output panel in the right.

At the top of the input panel, there are two slider controls that determine the size of the grid.

Move these untill you have the desired size.

To add a robot, click 'New Robot'. A control panel for the new robot will appear. The default position is (0,0), which is the bottom left hand corner of the grid.

Use the two sliders to adjust the initial position of the robot. Use 'initial orientation' dropdown to select which way your robot is facing to start off with.

To enter commands, click on the text area below the words 'Edit Commands'. You can enter F for forward, R for right, and L for left.

There is a maximum of 50 commands per robot.

The output component will update in real time to relfect the changes in your robot scenario. The output is intended to follow the rules defined in the app instructions.

There is a graphical view, and a text view. The text view generates output in the format supplied with the task instructions. The graphical view uses the same information to build a picture of the scenario.

Both views reflect the end state of the scenario after all commands have been applied, and are updated whenever there is a change to the grid, or the robots.

You can select a robot via the pagination control on the left hand side, or by clicking on a robot in the graphical output.



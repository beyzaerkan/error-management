<h1 align="center">
 <br/>
 Error Management
</h1>

Error management web interface for vehicles.

## Introduce
+ [Roadmap](#roadmap)
  + [Pages](#pages)
  + [Todos](#todos)
+ [Technologies](#technologies)
+ [Usage](#usage)
+ [Status](#status)
+ [Contributors](#contributors)
+ [License](#license)

## Roadmap
### Pages
#### Start page `/`
This page is start page when the application is opened. Language selection can be made on this page. The default language of the browser is selected. You can go to the terminal list.
![start-page](https://user-images.githubusercontent.com/76122007/230053664-474df2a7-c95c-4689-b50f-17e753219078.png)

#### Terminal List `/terminals`
This page is where all terminals are listed. The filter is selected and redirects to the login page.

![terminal-list](https://user-images.githubusercontent.com/76122007/229912230-510d8517-51f1-4c18-89ac-7af96f48d21a.png)

#### Terminal Login `/terminals/:depCode/:filterCode`
This page is login page. Brings up the terminal list by to the selected filter. The background of the section changes according to the shift change. Login is done with registration number, password assembly number. If the information received from the form is wrong, toast returns a message, if it is correct, it redirects to the error login page. The UI is blocked when the log in button is clicked

![terminal-login](https://user-images.githubusercontent.com/76122007/229912301-155a1cbb-c957-4ced-9f3a-e30eccdb6dc0.png)

![login-success](https://user-images.githubusercontent.com/76122007/229912320-804a60b0-9876-45ab-a0a4-9b857ad58b68.png)

#### Error Entry `/terminal/defectentry/:depCode/:filterCode`
This page is  where the error was entered. Parts of the vehicle are shown with boxes on the model picture. If no error is saved for the first 10 seconds, an annoying sound will be played. 
![no-error-entry](https://user-images.githubusercontent.com/76122007/229913095-fe6ff680-487a-47a0-ace7-3c822b72dc2d.png)

Clicking on the blue boxes goes to the subpicture and the error is selected and the cursor opens for location selection. clicking on the green or red boxes directly selects the error. When the error is selected, the error record button becomes active. 
![sub-image](https://user-images.githubusercontent.com/76122007/229913083-ea9b4ed0-5f48-4e9d-b7e1-e8276cc8cafb.png)
![error-entry-cursor](https://user-images.githubusercontent.com/76122007/229913091-d7e327d9-d117-455c-8da7-84c9e190b959.png)

The selected error is saved with the form screen that appears when the save error button is pressed. The error is saved, the information received from the form is displayed on the screen as a toast message and returns to the error entry screen.
![error-entry-form](https://user-images.githubusercontent.com/76122007/229913079-e4d0af6b-4a2e-4c52-992d-41ee1a064d5b.png)
![error-saved](https://user-images.githubusercontent.com/76122007/229913072-37e1a133-e4ad-45fe-8272-920deefe1f8d.png)

#### Big Font
This is a component of the error entry page. If there is no interaction for 10 seconds, the background color will turn red.
![big-font](https://user-images.githubusercontent.com/76122007/229914763-c4c4a12f-5c19-4f55-90be-543635798544.png)
![big-font-error](https://user-images.githubusercontent.com/76122007/229914758-a2a44956-8a9c-411b-90aa-2ce91e55f780.png)

#### Error List `/terminal/defcorrect`
This page is where the errors are listed. Errors can be filtered by assembly no and body no, sorted according to table headings as ascending or descending. Errors can be deleted.
![error-list](https://user-images.githubusercontent.com/76122007/229914315-159598f7-81c6-425f-a81d-417bb864038a.png)


### Todos

**basic**
- [X] User interface
- [X] Components

**detailed**
- [X] Responsive design
- [X] Multi language support
- [X] Virtual keyboard
- [X] UI Blocking

## Technologies
- ReactJS
- HTML 5 & CSS3
- Material UI
- Formik – Yup
- Axios
- React Router Dom
- Context Api
- I18 – next
- Table Virtuoso
- React Simple Keyboard


## Usage
### Install
```bash
git clone https://github.com/beyzaerkan/error-management.git
cd error-management
```

### Setup
Install dependencies
```bash
npm install
```

### Set Environment Variables
```bash
cp sample.env .env
```

### Start
```bash
npm start
```

## Status
This project has been completed. But it can be improved.

## Contributors
<a href = "https://github.com/beyzaerkan/error-management/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo=beyzaerkan/error-management"/>
</a>

## License
[GNU GENERAL PUBLIC LICENSE Version 3](./LICENSE)

import { ITournament } from '../data/Tournament.typing';

export const generateHtml = (data: ITournament): string => {
  console.log('generating html with data', data);
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${data.name} | ${data.tournamentName}</title>
    <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossorigin="anonymous"
    />
</head>
<body>
    <div class="wrapper">
    <div class="container">
        <div class="row justify-tiesm-center align-items-center">
        <!-- Brand & Tournament Info -->
        <div class="col-4">
            <div class="d-flex justify-tiesm-center align-items-center">
            <img src="${data.logoLink}" width="90" height="90" />
            <h2 style="color: ${data.brandColor} ">
                ${data.name}
            </h2>
            </div>
        </div>
        <div class="col-8">
            <h2 style="color: ${data.accentColor}">
            ${data.tournamentName}
            </h2>
        </div>
        <!-- Tournament info -->
        <div class="col-6">
            <h2>Tournament Info</h2>
            <table class="table">
            <tbody>
                <tr>
                <td>Host:</td>
                <td>
                    <div>${data.name}</div>
                </td>
                </tr>
                <tr>
                <td>Tournament</td>
                <td>
                    <div>${data.tournamentName}</div>
                </td>
                </tr>
                <tr>
                <td>N° of players</td>
                <td>
                    <div>${data.playersNumber}</div>
                </td>
                </tr>
                <tr>
                <td>StreamLink</td>
                <td>
                    <div>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="${data.streamLink}"
                        >Watch Live</a
                    >
                    </div>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
        <!-- Fake Player -->
        <div class="col-6">
            <video width="600" height="400" controls>
            <source src="${data.streamLink}" type="video/mp4" />
            </video>
        </div>
        </div>
    </div>
    </div>
</body>
</html>
    `;
};

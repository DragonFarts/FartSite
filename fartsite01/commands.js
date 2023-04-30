function handleCommand(command) {
    command = command.toLowerCase(); // convert to lowercase
    if (command === "hello") {
        return "hello";
    } else if (command === "goodbye") {
        return "goodbye";
    } else if (command === "games") {
        return "3dbox, 3dshoot, 2dshoot, break, drrobot, cobra, chimp, landgen, pong";
        
    } else if (command.startsWith("run ")) {
        const filename = command.substring(4) + ".html";
        window.location.href = filename;
        return "";
    } else if (command === "3dbox") {
        window.location.href = "3DBox/index.htm";
        return "";
    } else if (command === "3dshoot") {
        window.location.href = "3DShoot/index.htm";
        return "";
    } else if (command === "2dshoot") {
        window.location.href = "2DShoot/index.html";
        return "";
    } else if (command === "break") {
        window.location.href = "Break/index.html";
        return "";
    } else if (command === "cobra") {
        window.location.href = "Cobra/index.html";
        return "";
    } else if (command === "chimp") {
        window.location.href = "Chimp/index.html";
        return "";
    } else if (command === "drrobot") {
        window.location.href = "DrRobot/index.html";
        return "";
    } else if (command === "landgen") {
        window.location.href = "LandGen/index.html";
        return "";
    } else if (command === "pong") {
        window.location.href = "Pong/index.html";
        return "";
    } else {
        return "Invalid Command";
    }
}

// MSdros
        const input = document.getElementById('input');
        const output = document.getElementById('output');
        const cursor = document.querySelector('.cursor');
        const textMeasure = document.getElementById('text-measure');

        function handleCommand(command) {
            const response = handleCustomCommands(command);
            if (response === "Invalid Command") {
              response = handleCommand(command);
            }
            if (response !== "") {
              const line = document.createElement("div");
              line.innerHTML = `C:\\>${command}`;
              output.appendChild(line);
          
              const responseLine = document.createElement("div");
              responseLine.textContent = response;
              output.appendChild(responseLine);
            }
          }
          
          

        function updateCursor() {
            textMeasure.textContent = input.value;
            const textWidth = textMeasure.offsetWidth;
            cursor.style.left = 40 + textWidth + 'px';
        }

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const command = input.value.trim();
                if (command.length > 0) {
                    const line = document.createElement('div');
                    line.innerHTML = `C:\\>${command}`;
                    output.appendChild(line);

                    const response = handleCommand(command);
                    const responseLine = document.createElement('div');
                    responseLine.textContent = response;
                    output.appendChild(responseLine);
                }
                input.value = '';
                updateCursor();
                output.scrollTo(0, output.scrollHeight);
            } else {
                setTimeout(updateCursor, 0);
            }
        });

        input.addEventListener('blur', (e) => {
            e.preventDefault();
            input.focus();
        });

input.addEventListener('input', updateCursor);

function(instance, context) {
    let lastCameraCount = 0; // Variável para armazenar o número anterior de câmeras

    function checkForCamera() {
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                // Filtra apenas os dispositivos do tipo 'videoinput' (câmeras)
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                
                // Verifica o número de câmeras
                const cameraCount = videoDevices.length;
                const hasCamera = cameraCount > 0;

                // Verifica se a quantidade de câmeras mudou
                if (cameraCount !== lastCameraCount) {
                    // Atualiza o estado 'camera_detected' e 'camera_count' se a quantidade mudou
                    instance.publishState('camera_detected', hasCamera ? 'yes' : 'no');
                    instance.publishState('camera_count', cameraCount); // Opcional, pode adicionar a quantidade de câmeras

                    // Atualiza o contador de câmeras
                    lastCameraCount = cameraCount;
                }
            })
            .catch(err => {
                console.error('Erro ao detectar dispositivos:', err);
                instance.publishState('camera_detected', 'no');
                instance.publishState('camera_count', 0); // Se ocorrer erro, assume-se que não há câmeras
            });
    }

    // Chama a função para verificar as câmeras disponíveis a cada 3 segundos
    setInterval(checkForCamera, 3000); // Verificação periódica a cada 3 segundos
}

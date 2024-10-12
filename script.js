const apiKey = '9d1aca5b4cec0ba55b3bc337265fc962'; // Substitua pela sua chave API

document.getElementById('fetchButton').addEventListener('click', async () => {
    const ipAddress = document.getElementById('ipInput').value;
    const url = `https://api.ipstack.com/${ipAddress}?access_key=${apiKey}`;
    const options = { method: 'GET' };

    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const result = await response.json();
        displayResult(result);
    } catch (error) {
        document.getElementById('result').innerText = 'Erro: ' + error.message;
    }
});

function displayResult(data) {
    if (data.error) {
        document.getElementById('result').innerText = 'Erro: ' + data.error.info;
        return;
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2> Resultado:</h2>
        <p><strong>IP:</strong> ${data.ip || 'N/A'}</p>
        <p><strong>Tipo:</strong> ${data.type || 'N/A'}</p>
        <p><strong>Continente:</strong> ${data.continent_name || 'N/A'} (${data.continent_code || 'N/A'})</p>
        <p><strong>País:</strong> ${data.country_name || 'N/A'} (${data.country_code || 'N/A'}) <img src="${data.location?.country_flag || ''}" class="country-flag" alt="Flag"></p>
        <p><strong>Região:</strong> ${data.region_name || 'N/A'} (${data.region_code || 'N/A'})</p>
        <p><strong>Cidade:</strong> ${data.city || 'N/A'}</p>
        <p><strong>CEP:</strong> ${data.zip || 'N/A'}</p>
        <p><strong>Latitude:</strong> ${data.latitude || 'N/A'}</p>
        <p><strong>Longitude:</strong> ${data.longitude || 'N/A'}</p>
       
    `;
}

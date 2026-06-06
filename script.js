const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
let allCoins = [];

// ── Method 1: Async/Await ────────────────────────────────────
const fetchwithAsyncAwait = async () => {
    try {
        const resp = await fetch(API_URL)
        const data = await resp.json()
        allCoins = data
        renderTable(data)

        //console.log(data);
    } catch (error) {
        console.log(error);
    }
}

// ── Method 2: .then ────────────────────────────────────
 const fetchWithThen = () => {
    fetch(API_URL)
     .then((response) => response.json())
     .then((data) =>(
        allCoins = data
     ))
     .catch((error) => console.log(error.message));
 }



const renderTable = (data) => {

    const tablebody = document.getElementById('crypto-table');
    tablebody.innerHTML = "";


    data.forEach((coin) => {

        const tablehead = document.getElementById('table-head');
        const tRow = document.createElement('tr');

        //---------- Image ----------
        const tdImage = document.createElement("td")
        const image = document.createElement("img")
        image.src = coin.image;
        image.alt = coin.name;
        image.style.width = "20px"
        image.style.height = "20px"

        tdImage.appendChild(image)

        //---------- Name ----------
        const tdName = document.createElement('td');
        tdName.textContent = coin.name;

        //---------- Symbol ----------
        const tdSymbol = document.createElement("td");
        tdSymbol.textContent = coin.symbol.toUpperCase();

        //----------Current-Price----------
        const tdPrice = document.createElement("td");
        tdPrice.textContent =  `$${coin.current_price.toLocaleString()}`

        //---------- Total Volume ----------
        const tdVolume = document.createElement("td");
        tdVolume.textContent = `$${coin.total_volume.toLocaleString()}`

        //---------- @ 24 hr change ----------
        const tdChange = document.createElement('td')
        const change = coin.price_change_percentage_24h.toFixed(2)
        tdChange.textContent = `${change}%`
        tdChange.style.color = change >= 0 ? '#22c55e' : '#ef4444'


        //---------- Market Cap ----------
        const tdMarketcap = document.createElement("td");
        tdMarketcap.textContent = `Mkt Cap: $${(coin.market_cap.toLocaleString())}`;

        //---------- Appending to Row: table_data ----------
        tRow.appendChild(tdImage);
        tRow.appendChild(tdName);
        tRow.appendChild(tdSymbol);
        tRow.appendChild(tdPrice);
        tRow.appendChild(tdVolume);
        tRow.appendChild(tdChange)
        tRow.appendChild(tdMarketcap);
        //--------Appending to Body---------
        tablebody.appendChild(tRow)
    });
}


// ── Search ─────────────────────────────────────────────
document.getElementById('search').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase()
    const filtered = allCoins.filter(coin =>
      coin.name.toLowerCase().includes(query) ||
      coin.symbol.toLowerCase().includes(query)
    )
    renderTable(filtered)
  })
  
  // ── Sort by market cap ─────────────────────────────────
  document.getElementById('sort-market-cap').addEventListener('click', () => {
    const sorted = [...allCoins].sort((a, b) => b.market_cap - a.market_cap)
    renderTable(sorted)
  })
  
  // ── Sort by % change ───────────────────────────────────
  document.getElementById('sort-change').addEventListener('click', () => {
    const sorted = [...allCoins].sort((a, b) =>
      b.price_change_percentage_24h - a.price_change_percentage_24h
    )
    renderTable(sorted)
  })
  
  // ── Start app ──────────────────────────────────────────
  fetchwithAsyncAwait()






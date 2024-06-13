# Blockchain Data Visualization App

## Overview

This project is a React web application designed to fetch and visualize live blockchain data, including transaction counts, gas fees, and gas usage ratios. It utilizes the Alchemy SDK for interfacing with the Ethereum blockchain and Google Charts for data visualization.

![Screenshot 2024-06-13 130515](https://github.com/Danishlynx/Charts_using_EthereumAPI/assets/69537135/9b351c01-2a08-41bb-8002-ec3ddb4d8be8)



## Features

- **Live Data Fetching**: The app retrieves live blockchain data using the Alchemy SDK, including transaction logs and gas-related information.
  
- **Data Visualization**: Utilizes Google Charts to visualize blockchain data in three charts:
  - Transactions per Block
  - Base Fee Per Gas
  - Gas Used Ratio

- **Interactivity**: Users can fetch updated data on-demand with a single button click.

## Installation

1. Clone the repository:
```
git clone https://github.com/Danishlynx/metana_bootcamp.git

```

2. Navigate to the project directory:
```
cd metana_bootcamp/module_5/module_5

```


3. Install dependencies:
```
npm install

```


4. Set up environment variables:
- Create a `.env` file in the root directory with the following content:
  ```
  REACT_APP_ALCHEMY_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxx"

  ```

5. Start the development server:
```
npm start
```


## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Click the "Fetch Current Data" button to fetch and visualize the latest blockchain data.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Alchemy SDK**: Interface with the Ethereum blockchain for fetching live data.
- **Google Charts**: Library for visualizing data in charts.
- **npm**: Package manager for installing project dependencies.

## Folder Structure

metana_bootcamp/
│
├── module_5/
│   ├── module_5/
│   │   ├── src/
│   │   │   ├── App.js
│   │   │   ├── App.css
│   │   │   ├── components/
│   │   │   │   ├── log.js
│   │   │   │   ├── gas.js
│   │   │   │   └── ...
│   │   │   └── ...
│   │   ├── .env
│   │   ├── package.json
│   │   └── ...
│   └── ...
│
├── .gitignore
└── ...



## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- **Open Source Community**: Thanks to all the developers who contribute to open source projects, making resources like the Alchemy SDK and Google Charts available for use.


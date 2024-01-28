
build_as:
    npm run aspect:build

deploy:
    npm run contract:deploy -- --skfile ./privateKey.txt --abi ./build/contract/Aml.abi --bytecode ./build/contract/Aml.bin --args '0x1F272fA39E783B8dB5f851d9Edb9F10EA0809a88' --gas 200000
    # 0xfd29283fAa78130A4431d94aE7f43d72135f4Ec0

test:
    npm run contract:deploy -- --skfile ./privateKey.txt --abi ./build/contract/Aml.abi --bytecode ./build/contract/Aml.bin --args '0x1F272fA39E783B8dB5f851d9Edb9F10EA0809a88' --gas 200000

deploy_as:
    npm run aspect:deploy -- --skfile ./privateKey.txt --wasm ./build/release.wasm --properties []  --joinPoints PostContractCall  --gas 200000
    #== deploy aspectID == 0x7B2BE1a617Da84eE5735F7cD0eC0676CDaE5410a

deploy_as_:
    npm run aspect:deploy -- --skfile ./privateKey.txt --wasm ./build/release.wasm --properties [{\"key\":\"k\",\"value\":\"v\"},{\"key\":\"k1\",\"value\":\"v1\"}]  --joinPoints {PreContractCall}  --gas 200000

bind:
    npm run contract:bind -- --skfile ./privateKey.txt --contract 0xdc32695f60B4a517de56351CB65332311B1bEF08 --abi ./build/contract/Aml.abi --aspectId 0xc73354b30A04FDAFFbfB52768e002a1b29281349 --gas 200000

unbind:
    npm run contract:unbind -- --contract 0x4f59c931fB8b1138348C950110D484B07007F1AF --aspectId 0xA7d8497480b28B90f2327F6bD6E588A7e2733BBf

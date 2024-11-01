const units = {
    pascal: {
        name: 'pascal',
        factor: 1
    },
    kpa: {
        name: 'kpa',
        factor: 1000
    },
    bar: {
        name: 'bar',
        factor: 100000
    },
    mpa: {
        name: 'mpa',
        factor: 1000000
    },
    atm: {
        name: 'atm',
        factor: 101325
    },
    mmHg: {
        name: 'mmHg',
        factor: 133.322
    },
    psi: {
        name: 'psi',
        factor: 6894.75729
    }
};

function convertPressure(value, fromUnit) {
    // 转换为帕斯卡
    const pascalValue = value * units[fromUnit].factor;
    const results = {};

    // 转换为其他单位
    for (const unit in units) {
        results[unit] = pascalValue / units[unit].factor;
    }

    return results;
}

function formatNumber(num) {
    if (Math.abs(num) < 0.000001 || Math.abs(num) > 999999) {
        return num.toExponential(6);
    }
    return num.toPrecision(7).replace(/\.?0+$/, '');
}

function updateInputs(event) {
    if (event.key === 'Enter') {
        const input = event.target;
        const inputValue = parseFloat(input.value);
        const inputUnit = input.id;

        if (!isNaN(inputValue)) {
            const conversions = convertPressure(inputValue, inputUnit);
            
            for (const unit in units) {
                if (unit !== inputUnit) {
                    const element = document.getElementById(unit);
                    element.value = formatNumber(conversions[unit]);
                }
            }
        }
    }
}

// 为所有输入框添加事件监听器
for (const unit in units) {
    const element = document.getElementById(unit);
    if (element) {
        element.addEventListener('keypress', updateInputs);
    }
}
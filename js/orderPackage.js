function OrderPackage()
{	
	var outputContainer;
	var button;
	var orderAmountInput;
	var orderAmount;
	var packages = [250, 500, 1000, 2000, 5000];
	var packagesCount;
	var orderOutputText;
	var allocatedPackages;
	
	/**
	* Order handling
	*/
	this.setOrderAmountInput = function(id) {
		orderAmountInput = document.getElementById(id);
		if (orderAmountInput === 'undefined') {
			log('Failed to initiliaze order amount input.');
		}
	};
	
	function processOrderPackages()
	{
		resetOutputText();
		resetAllocatedPackagesValues();
		splitOrderToPackages();
		reallocatePackages();
		outputOrderPackages();
	}
	
	function splitOrderToPackages()
	{
		var amount = orderAmount;
		for(var i = 0; i < packagesCount; i++){
			allocatedPackages[packages[i]] = Math.floor(amount / packages[i]);

			amount = amount % packages[i];

			if(packagesCount == i + 1 && amount > 0) {
			   allocatedPackages[packages[i]] += 1;
			}
		}
	}
	
	function reallocatePackages()
	{
		for (var i = packagesCount - 1; i > 1; i--) {
			var value = allocatedPackages[packages[i]] * packages[i];
			for (var j = 0; j < i; j++) {
				
				var value2 = Math.floor(value / packages[j]);
				if (value2 > 0) {
					allocatedPackages[packages[j]] += value2;
					allocatedPackages[packages[i]] -= Math.floor(packages[j] / packages[i]) * value2;
				}
			}
		}
	}
	
	function outputOrderPackages()
	{
		for (var i = 0; i < packagesCount; i++) {
			if (allocatedPackages[packages[i]] != 0) { 
				orderOutputText += packages[i] + ' x ' + allocatedPackages[packages[i]] + '<br/>';
			}
		}
		
		if (orderOutputText === '') {
			updateOutputText('No valid pacakages combination found.');
		} else {
			updateOutputText(orderOutputText);
		}
	}
	
	function resetAllocatedPackagesValues()
	{
		allocatedPackages = [];
		for(var i = 0; i < packagesCount; i++) {
			if (packages[i] <= 0) {
				log('Invalid package size: '+ packages[i]);
				packages.splice(i, 1);
				packagesCount--;
				i--;
			} else {
				allocatedPackages[packages[i]] = 0;
			}
		}
	}	
	//end Order handling
	
	/**
	* Output container handling
	*/	
	this.setOutputElement = function(id) {
		outputContainer = document.getElementById(id);
		if (outputContainer === 'undefined') {
			log('Failed to initiliaze output.');
		}
	};
	
	function resetOutputText()
	{
		orderOutputText = ''
		outputContainer.innerHTML = '';
	}
	
	function updateOutputText(text)
	{
		outputContainer.innerHTML = text;
	}	
	//Output container handling end
	
	/**
	* Button handling
	*/
	this.setButton = function(id){
		button = document.getElementById(id);
		if (typeof button === 'undefined') {
			log('Failed to initiliaze button.');
		} else {
			initButtonHandler();
		}
	};
	
	function initButtonHandler()
	{
		button.addEventListener('click', function(){
			orderAmount = parseInt(orderAmountInput.value);
			
			if (!orderAmount || orderAmount < 1) {
				updateOutputText('Incorrect order amount!');
				return false;
			}
			
			processOrderPackages();
		});
	}
	//Button handling end
	
	
	function log(text)
	{
		console.log(text);
	}
	
	function _init()
	{
		packages.sort(function(a, b){return b - a});
		packagesCount = packages.length;
		resetAllocatedPackagesValues();
	}

	_init();
}
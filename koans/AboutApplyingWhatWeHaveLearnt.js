var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];
      var noNutsOrShrooms = function(item) {
        return !item.containsNuts && _(item.ingredients).all(function(x) { return x !== "mushrooms"});
      }

      productsICanEat = products.filter(noNutsOrShrooms);

      

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _(_.range(1,1000)).chain()
                    .filter(function(x) { return x % 3 === 0 || x % 5 === 0;})
                    .reduce(function(total, current) { return total + current;})
                    .value();    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };
    var gatherIngredients = function(item) {
        return item.ingredients;
    }
    var addIngredients = function(total, ingredient) {
      ingredientCount[ingredient]= (ingredientCount[ingredient] || 0) + 1;
      return total;
    }

    _(products).chain()
               .map(gatherIngredients)
               .flatten()
               .reduce(addIngredients)
               .value();

    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR ADVANCED */
  
  it("should find the largest prime factor of a composite number", function () {
    var largestPrimeFactor = function (num) {
      var factors = [];
      var primes = [];
      var checkPrime = function(num) {
        for (var i = num - 1; i > 1; i--) {
          if (num % i === 0) {
            return false;
          } 
        }
        return true;
      }
      if (checkPrime(num) || num <= 1 || num % 1 !== 0) return "Not a composite number!"; // filter invalid arguments
      
      for(var i = num; i > 0; i--) { // create array of factors
        if (num % i === 0) {
          factors.push(i);
        }
      }
      
      primes = factors.filter(checkPrime);

      return primes[0];

    }
    expect(largestPrimeFactor(0)).toBe("Not a composite number!");
    expect(largestPrimeFactor(13)).toBe("Not a composite number!");
    expect(largestPrimeFactor(2.5)).toBe("Not a composite number!");
    expect(largestPrimeFactor(26)).toBe(13);
    expect(largestPrimeFactor(28)).toBe(7);
    expect(largestPrimeFactor(959)).toBe(137);
  });

  

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var largestPalinProduct = function() {
      var largest = 0;
      
      var isPalindrome = function(num) {
        var revStr = ""
        var str = num.toString();
        for (var i = str.length - 1; i >= 0; i--) {
          revStr += str[i];
        }
        return (str === revStr);
      } 

      for(var i = 100; i < 1000; i++) {
        for (var j = 100; j < 1000; j++) {
          if (isPalindrome(i*j) && (i*j) > largest) {
            largest = i*j; 
          }
        }
      }
      return largest;
    }
    expect(largestPalinProduct()).toBe(906609);
    
  });

  

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      var smallestDivisible = function() { // This solution is probably not the fastest but it works
        var check = 20;
        var notDivisible = function(num) {
          for (var i = 2; i <= 20 ; i++) {
            if (num % i !== 0) {
              return true;
            }
          }
          return false;
        }

        while (notDivisible(check)) {
          check++;
        }
        return check;
      }
    expect(smallestDivisible()).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var squaresAndSums = function(num) {
      var sumOfSquares = function(num) {
        var sum = 0;
        for (num; num > 0; num--) {
          sum += num * num;
        }
        return sum;
      }
      var squareOfSums = function(num) {
        var total = 0;
        for (num; num > 0; num--) {
          total += num;
        }
        return total * total;
      }

      return squareOfSums(num) - sumOfSquares(num);
    }
    expect(squaresAndSums(10)).toBe(2640);
    expect(squaresAndSums(100)).toBe(25164150)
    
  });

  it("should find the 10001st prime", function () {
    var findThisPrime = function(ordinalNum) { // This also is a very slow solution but, once again, works!
      var primeCount = 0;
      var intCount = 2;
      var prime = 2;
      var checkPrime = function(num) {
        for (var i = num - 1; i > 1; i--) {
          if (num % i === 0) {
            return false;
          }
        }
        return true;
      }

      while (primeCount < ordinalNum) {
        if (checkPrime(intCount)) {
          primeCount++;
          prime = intCount;
          intCount++;
        } else {
        intCount++;
        }
      }
      return prime;

    }
    expect(findThisPrime(1)).toBe(2);
    expect(findThisPrime(100)).toBe(541);
    expect(findThisPrime(10001)).toBe(104743);

  });

  
  
});

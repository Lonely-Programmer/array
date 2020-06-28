class Fraction{

   constructor(numerator, denominator = 1) {
     if (Number.isInteger(numerator) && Number.isInteger(denominator)) {
       this.numerator   = numerator;
       this.denominator = denominator;
     } else if (numerator instanceof Fraction || denominator instanceof Fraction) {
       numerator   = numerator instanceof Fraction ? numerator : new Fraction(numerator, 1);
       denominator = denominator instanceof Fraction ? denominator : new Fraction(denominator, 1);
 
       return numerator.clone().divide(denominator);
     } else {
       throw new TypeError('prams must be Number or Fraction');
     }
     this.simplify();
   }
 
   static greatestCommonDivisor(num1, num2) {
     let lesser  = Math.abs(num1);
     let greater = Math.abs(num2);
 
     while (lesser !== 0) {
       let t   = lesser;
       lesser  = greater % lesser;
       greater = t;
     }
     return greater;
   }
 
   clone() {
     return new Fraction(this.numerator, this.denominator);
   }
 
   simplify() {
     if(this.denominator < 0)
     {
         this.denominator = -this.denominator;
         this.numerator = -this.numerator;
     }
     const gcd        = Fraction.greatestCommonDivisor(this.numerator, this.denominator);
     this.numerator   = this.numerator / gcd;
     this.denominator = this.denominator / gcd;

     return this;
   }
 
   toString() {
     return `${this.numerator}/${this.denominator}`;
   }
 
   static fromString(str = '') {
     let arr = str.split('/').map(Number).filter(Number.isInteger);
     if (arr.length === 1) arr.push(1);
     if (arr.length !== 2) throw TypeError('params must be 2 Integer spread by "/"');
     return new Fraction(arr[0], arr[1]);
   }
 
   get value() {
     return this.numerator / this.denominator;
   }
 
   static add(frac1, frac2) {
     frac1 = frac1 instanceof Fraction ? frac1.clone() : new Fraction(frac1);
     frac2 = frac2 instanceof Fraction ? frac2.clone() : new Fraction(frac2);
 
     //  a/b + c/d = (a*d+b*c) / b*d
     frac1.numerator   = frac1.numerator * frac2.denominator + frac1.denominator * frac2.numerator;
     frac1.denominator = frac1.denominator * frac2.denominator;
     return frac1.simplify();
   }
 
   add(frac) {
     return Fraction.add(this, frac);
   }
 
   static subtract(frac1, frac2) {
     frac1 = frac1 instanceof Fraction ? frac1.clone() : new Fraction(frac1);
     frac2 = frac2 instanceof Fraction ? frac2.clone() : new Fraction(frac2);
 
     //  a/b + c/d = (a*d-b*c) / b*d
     frac1.numerator   = frac1.numerator * frac2.denominator - frac1.denominator * frac2.numerator;
     frac1.denominator = frac1.denominator * frac2.denominator;
     return frac1.simplify();
   }
 
   subtract(frac) {
     return Fraction.subtract(this, frac);
   }
 
   static multiply(frac1, frac2) {
     frac1 = frac1 instanceof Fraction ? frac1.clone() : new Fraction(frac1);
     frac2 = frac2 instanceof Fraction ? frac2.clone() : new Fraction(frac2);
 
     // (a/b)*(c/d) = (a*b)/(c*d)
     frac1.numerator   = frac1.numerator * frac2.numerator;
     frac1.denominator = frac1.denominator * frac2.denominator;
     return frac1.simplify();
   }
 
   multiply(frac) {
     return Fraction.multiply(this, frac);
   }
 
   static divide(frac1, frac2) {
     frac1 = frac1 instanceof Fraction ? frac1.clone() : new Fraction(frac1);
     frac2 = frac2 instanceof Fraction ? frac2.clone() : new Fraction(frac2);
 
     //  (a/b) / (c/d) = (a*d) / (b*c)
     frac1.numerator   = frac1.numerator * frac2.denominator;
     frac1.denominator = frac1.denominator * frac2.numerator;
     return frac1.simplify();
   }
 
   divide(frac) {
     return Fraction.divide(this, frac);
   }

   show() {
    if(this.denominator != 1)
    {
        if(this.numerator > 0)
          return `\\frac{${this.numerator}}{${this.denominator}}`;
        else
          return `-\\frac{${-this.numerator}}{${this.denominator}}`;
    }
      
    return `${this.numerator}`;
 
 }
}
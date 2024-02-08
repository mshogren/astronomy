## Introduction
This repository is an attempt to revive and modernize some code I was working on in 2013.  The original code was an attempt to work through some parts of the terrific book [Astronomical Algorithms, 2nd Edition by Jean Meeus](https://shopatsky.com/products/astronomical-algorithms-2nd-edition) which you can try to find here on [Amazon](https://www.amazon.com/Astronomical-Algorithms-Jean-Meeus/dp/0943396352) though it is hard to come by.  I was specifically interested in the algorithms for calculating rise, transit and set for various solar system bodies.  The initial goal here is to create some code suitable for use in a web client application (eg. Javascript/Typescript or Blazor WASM).

## Ephemerides
Many algorithms rely on the positions of solar system bodies.  There are a variety of methods for calculating these that have trade-offs with regards to accuracy, data requirements (disk, memory, network), and computational complexity.  The main ways of computing these positions are
- [VSOP models](https://en.wikipedia.org/wiki/VSOP_model)
- [JPL Development Ephemeris](https://en.wikipedia.org/wiki/Jet_Propulsion_Laboratory_Development_Ephemeris)

The VSOP models are semi-analytic models of equations with periodic terms.  The tables of coefficients for these models are small so the data requirements are low.  Calculating a few terms is quite quick but the series converge slowly so accurate results may take more computation time.  On the other hand the JPL DE models are equations of Chebyshev polynomials with tables of coefficients for equal length periods over an epoch.  These tables of coefficients are very large but the calculations they yield are fast and very accurate.

I decided to use the JPL DE models but found that there were not suitable libraries written for the programming languages I wish to use so I have decided to create my own npm package [here](js/ephemerides/).  Originally my idea was to model this on a Java project called [JDERead](https://sourceforge.net/projects/jderead/) by [Peter Hristozov](https://sourceforge.net/u/peterhri/profile/).  Specifically I would have been using the coefficients like [this](https://sourceforge.net/p/jderead/code/ci/v.1.5/tree/JDEread/src/jderead/DEephem.java) but using my own method for retrieving the coefficients that was browser friendly.  It has come to my attention that there may be more efficient algorithms for calculating the Chebyshev polynomials so I will investigate.

## SOFA
Many algorithms and calculations depend on common transformations between coordinate systems and frames of reference, between various calendars and time scales, etc.  A useful collection of these is the [International Astronomical Union's Standards of Fundamental Astronomy (SOFA)](http://www.iausofa.org/index.html).

In the past I had used a transliteration of the original SOFA library to Java called [JSOFA](https://javastro.github.io/jsofa/) to create my own second transliteration into Javascript.  At this time I will be looking into other options.

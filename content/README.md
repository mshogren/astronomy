This folder is the place to store content such as the [JPL Development Ephemerides](https://ssd.jpl.nasa.gov/planets/eph_export.html) data so it can be used by the various packages in this repository.

To get all of the ASCII data files you can run
```
wget -r -P . -nH --cut-dirs 4 ftp://ssd.jpl.nasa.gov/pub/eph/planets/ascii/
```

To just get the DE441 series that is currently being used by the [JPL Horizons System](https://ssd.jpl.nasa.gov/horizons/app.html#/) run
```
wget -r -P de441 -nH --cut-dirs 5 ftp://ssd.jpl.nasa.gov/pub/eph/planets/ascii/de441
```

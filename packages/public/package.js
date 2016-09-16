Package.describe({
    name: "public",
    summary: "Nova public resource package",
    version: "0.27.0-nova",
    git: "https://github.com/TelescopeJS/Telescope.git"
});

Package.onUse(function (api) {

    api.versionsFrom(['METEOR@1.0']);

    api.use([
        'nova:core@0.27.0-nova',
        'fourseven:scss@3.9.0',
        // 'juliancwirko:postcss@1.0.0-rc.4',
        // 'seba:minifiers-autoprefixer@0.0.1',
        // 'twbs:bootstrap@=4.0.0-alpha.2'
    ]);

    api.addAssets([
        'images/loader@2x-eedc15ac0cc66f017bf00a8befd9c708.png',
        'images/upvote-burst-white.png'
    ], ['client']);

});

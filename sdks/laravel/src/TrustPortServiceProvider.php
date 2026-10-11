<?php

namespace TrustPort\Identity;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use TrustPort\Identity\Http\Authenticate;
use TrustPort\Identity\Http\AuthController;

class TrustPortServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/trustport.php', 'trustport');
        $this->app->singleton(Client::class, fn ($app) => new Client($app['config']['trustport']));
    }

    public function boot(): void
    {
        $this->publishes([__DIR__ . '/../config/trustport.php' => config_path('trustport.php')], 'trustport-config');
        $this->app['router']->aliasMiddleware('trustport.auth', Authenticate::class);

        if (config('trustport.routes', true)) {
            Route::middleware('web')->prefix('auth/trustport')->group(function () {
                Route::get('login', [AuthController::class, 'login'])->name('trustport.login');
                Route::get('callback', [AuthController::class, 'callback'])->name('trustport.callback');
                Route::post('logout', [AuthController::class, 'logout'])->name('trustport.logout');
            });
        }
    }
}

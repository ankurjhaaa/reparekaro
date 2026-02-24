--- routes/web.php
+++ routes/web.php
@@ -71,6 +71,8 @@
     Route::put('/bookings/{id}/status', 'updateBookingStatus')->name('vendor.bookings.status');
     Route::get('/reports', 'reports')->name('vendor.reports');
     Route::get('/settings', 'settings')->name('vendor.settings');
+    Route::post('/settings', 'updateSettings')->name('vendor.settings.update');
+    Route::post('/settings/password', 'updatePassword')->name('vendor.settings.password');
 
     // Services CRUD
     Route::get('/services', 'services')->name('vendor.services');

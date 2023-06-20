<?php
if (!class_exists('CreateAdminPage')):

class CreateAdminPage {
  public function __construct()
  {
    if (is_admin()) {
      add_action('admin_menu', [$this, 'admin_menu']);
    }
  }

  // メインメニュー
  public function admin_menu()
  {
    add_menu_page(
      'wabs', /* ページタイトル*/
      'TOPオススメ・ランキング設定', /* メニュータイトル */
      'manage_options', /* 権限 */
      'utl_products', /* ページを開いたときのurl */
      [$this, 'home_page'], /* メニューに紐づく画面を描画するcallback関数 */
      'dashicons-admin-tools', /* アイコン */
      58 /* 表示位置の優先度 */
    );
  }
  // ホーム画面で使用するCSS・JSを読み込ませる
  public function include_home_resources()
  {
    $plugin_url = plugin_dir_url(__FILE__);
    $current_page_url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

    // プラグインのホーム画面でのみCSS・JSを読み込ませる
    if (preg_match('/admin\.php\?page=wabs$/u', $current_page_url)) {
      wp_enqueue_style('wabs-css', $plugin_url . 'front/dist/assets/index.css', [], wp_rand());
      wp_enqueue_script('wabs-js', $plugin_url . 'front/dist/assets/index.js', ['jquery', 'wp-element'], wp_rand(), true);
    }
  }

  // ホーム画面
  public function home_page()
  {
    $plugin_dir_path = plugin_dir_path(__FILE__);
    $html_content = file_get_contents($plugin_dir_path . 'front/dist/index.html');
    echo $html_content;
  }
}

endif;

// CreateAdminPage インスタンスの生成
new CreateAdminPage();

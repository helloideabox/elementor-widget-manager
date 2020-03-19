<?php
/**
 * Plugin Name: Elementor Widget Manager
 * Plugin URI: https://ideabox.io/
 * Author: IdeaBox
 * Author URI: https://ideabox.io
 * Version: 1.0.0
 * Description: A simple way to deactivate/activate Elementor widgets.
 * Text Domain: el-widget-manager
 *
 * @package WordPress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'EL_WIDGET_MANAGER_PATH', plugin_dir_path( __FILE__ ) );
define( 'EL_WIDGET_MANAGER_URL', plugin_dir_url( __FILE__ ) );
define( 'EL_WIDGET_MANAGER_VERSION', '1.0.0' );

/**
 * Main Elementor Widget Manager Class.
 *
 * The main class that initiates and runs the plugin.
 *
 * @since 1.0.0
 */
final class Elementor_Widget_Manager {

	/**
	 * Minimum Elementor Version.
	 *
	 * @since 1.0.0
	 *
	 * @var string Minimum Elementor version required to run the plugin.
	 */
	const MINIMUM_ELEMENTOR_VERSION = '2.0.0';

	/**
	 * Minimum PHP Version.
	 *
	 * @since 1.0.0
	 *
	 * @var string Minimum PHP version required to run the plugin.
	 */
	const MINIMUM_PHP_VERSION = '7.0';

	/**
	 * Instance
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 * @static
	 *
	 * @var Elementor_Widget_Manager The single instance of the class.
	 */
	private static $instance = null;

	/**
	 * Instance
	 *
	 * Ensures only one instance of the class is loaded or can be loaded.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 * @static
	 *
	 * @return Elementor_Widget_Manager An instance of the class.
	 */
	public static function instance() {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self(); // Self here denotes the class name.
		}
		return self::$instance;
	}

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'i18n' ) );
		add_action( 'plugins_loaded', array( $this, 'init' ) );
		add_action( 'admin_footer', array( $this, 'get_registered_widgets' ) );
	}

	/**
	 * Load Textdomain
	 *
	 * Load Plugin Localization Files.
	 *
	 * Fired by `init` action hook.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function i18n() {

		load_plugin_textdomain( 'el-widget-manager' );
	}

	/**
	 * Initialize the plugin
	 *
	 * Load the plugin only after Elementor (and other plugins) are loaded.
	 * Check for basic plugin requirements, if one check fail don't continue,
	 * if all check have passed load the files required to run the plugin.
	 *
	 * Fired by `plugins_loaded` action hook.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function init() {

		// Check if Elementor is installed and activated.
		if ( ! did_action( 'elementor/loaded' ) ) {
			add_action( 'admin_notices', array( $this, 'admin_notice_missing_main_plugin' ) );
			return;
		}

		// Check for required Elementor version.
		if ( ! version_compare( ELEMENTOR_VERSION, self::MINIMUM_ELEMENTOR_VERSION ) ) {
			add_action( 'admin_notices', array( $this, 'admin_notice_minimum_elementor_version' ) );
			return;
		}

		// Check for required PHP version.
		if ( ! version_compare( PHP_VERSION, self::MINIMUM_PHP_VERSION ) ) {
			add_action( 'admin_notices', array( $this, 'admin_notice_minimum_php_version' ) );
			return;
		}

		// Add Plugin action.
		$this->init_plugin();
	}

	/**
	 * Admin Notice
	 *
	 * Warning when site doesn't have Elementor installed or activated.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function admin_notice_missing_main_plugin() {

		// Checcking if current plugin is activated and then unset it.
		if ( isset( $_GET['activate'] ) ) {

			// Reset the variable.
			unset ( $_GET['activate'] );
		}

		// Printing the message.
		$message = sprintf(
			/* translators: 1: Plugin name 2: Elementor*/
			esc_html__( '"%1$s" requires "%2$s" to be installed and activated.', 'el-widget-manager' ),
			'<strong>' . esc_html__( 'Elementor Widget Manager', 'el-widget-manager' ) . '</strong>',
			'<strong>' . esc_html__( 'Elementor', 'el-widget-manager' ) . '</strong>'
		);

		printf( '<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message );

	}

	/**
	 * Admin Notice
	 *
	 * Warning when site does not have minimum required Elementor version.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function admin_notice_minimum_elementor_version() {

		// Checcking if current plugin is activated and then unset it.
		if ( isset( $_GET['activate'] ) ) {

			// Reset the variable.
			unset ( $_GET['activate'] );
		}

		// Printing the message.
		$message = sprintf(
			/* translators: 1: Plugin name 2: Elementor 3: Required Elementor version*/
			esc_html__( '"%1$s" requires "%2$s" version %3$s or greater.', 'el-widget-manager' ),
			'<strong>' . esc_html__( 'Elementor Widget Manager', 'el-widget-manager' ) . '</strong>',
			'<strong>' . esc_html__( 'Elementor', 'el-widget-manager' ) . '</strong>',
			self::MINIMUM_ELEMENTOR_VERSION
		);

		printf( '<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message );

	}

	/**
	 * Admin Notice
	 *
	 * Warning when site does not have minimum required Elementor version.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function admin_notice_minimum_php_version() {

		// Checcking if current plugin is activated and then unset it.
		if ( isset( $_GET['activate'] ) ) {

			// Reset the variable.
			unset ( $_GET['activate'] );
		}

		// Printing the message.
		$message = sprintf(
			/* translators: 1: Plugin name 2: PHP 3: Required PHP version*/
			esc_html__( '"%1$s" requires "%2$s" version %3$s or greater.', 'el-widget-manager' ),
			'<strong>' . esc_html__( 'Elementor Widget Manager', 'el-widget-manager' ) . '</strong>',
			'<strong>' . esc_html__( 'PHP', 'el-widget-manager' ) . '</strong>',
			self::MINIMUM_PHP_VERSION
		);

		printf( '<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message );

	}

	/**
	 * Elementer Registered Widget.
	 *
	 * Getting Elemnter all registered widget.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function get_registered_widgets() {
		$elementor = Elementor\Plugin::instance();

		$types = $elementor->widgets_manager->get_widget_types();

		$categories = $this->get_categories();

		//$elementor->widgets_manager->unregister_widget_type('heading');

		$widgets = array();

		foreach ( $types as $type ) {
			$widget_cat = $type->get_categories();

			if ( ! in_array( $widget_cat[0], $categories ) ) {
				continue;
			}
			$widgets[ $type->get_name() ] = $type->get_title();
		}

		if ( isset( $widgets['common'] ) ) {
			unset( $widgets['common'] );
		}

		return $widgets;
	}

	public function get_categories() {
		return array(
			'basic',
			'pro-elements',
			'general',
			'theme-elements',
			'woocommerce-elements',
			'wordpress'
		);
	}

	/**
	 * Include Files
	 *
	 * Including main files for plugin.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function init_plugin() {

		// Including class loader.
		require_once 'classes/class-widget-manager-loader.php';
	}

}


Elementor_Widget_Manager::instance();
